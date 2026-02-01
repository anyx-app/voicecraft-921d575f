SET search_path TO proj_6a64b944;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for user lookup
CREATE INDEX idx_profiles_user_id ON profiles(user_id);

-- RLS for Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');
  
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (user_id::text = current_setting('request.jwt.claims', true)::json->>'sub');


-- 2. Agents Table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  language TEXT DEFAULT 'en-US',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for Agents
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own agents" ON agents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = agents.user_id 
      AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

CREATE POLICY "Users can insert own agents" ON agents
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = agents.user_id 
      AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

CREATE POLICY "Users can update own agents" ON agents
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = agents.user_id 
      AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

CREATE POLICY "Users can delete own agents" ON agents
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = agents.user_id 
      AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );


-- 3. Voice Settings Table
CREATE TABLE voice_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL UNIQUE REFERENCES agents(id) ON DELETE CASCADE,
  voice_id TEXT NOT NULL,
  stability FLOAT DEFAULT 0.5,
  similarity_boost FLOAT DEFAULT 0.75,
  pitch FLOAT DEFAULT 1.0,
  speed FLOAT DEFAULT 1.0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for Voice Settings
ALTER TABLE voice_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own voice settings" ON voice_settings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM agents
      JOIN profiles ON profiles.id = agents.user_id
      WHERE agents.id = voice_settings.agent_id
      AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

CREATE POLICY "Users can update own voice settings" ON voice_settings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM agents
      JOIN profiles ON profiles.id = agents.user_id
      WHERE agents.id = voice_settings.agent_id
      AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );
  
CREATE POLICY "Users can insert own voice settings" ON voice_settings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM agents
      JOIN profiles ON profiles.id = agents.user_id
      WHERE agents.id = voice_settings.agent_id
      AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- 4. Agent Sessions
CREATE TABLE agent_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ DEFAULT now(),
  end_time TIMESTAMPTZ,
  duration_seconds INTEGER,
  client_ip TEXT,
  platform TEXT
);

-- RLS for Sessions
ALTER TABLE agent_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own agent sessions" ON agent_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM agents
      JOIN profiles ON profiles.id = agents.user_id
      WHERE agents.id = agent_sessions.agent_id
      AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );

-- 5. Analytics Events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES agent_sessions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  payload JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS for Analytics
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analytics" ON analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM agent_sessions
      JOIN agents ON agents.id = agent_sessions.agent_id
      JOIN profiles ON profiles.id = agents.user_id
      WHERE agent_sessions.id = analytics_events.session_id
      AND profiles.user_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
  );
