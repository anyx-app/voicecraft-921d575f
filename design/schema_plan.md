# Schema Plan - VoiceCraft

## Overview
VoiceCraft requires a database schema to support users creating, managing, and customizing voice AI agents. The core entities are Users, Agents, Voice Settings, and Analytics.

## Tables

### 1. `profiles` (extends auth.users)
Stores public user data. Links to Supabase Auth.
- `id` (uuid, PK, references auth.users.id)
- `email` (text)
- `full_name` (text, nullable)
- `avatar_url` (text, nullable)
- `company_name` (text, nullable)
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### 2. `agents`
Represents the AI voice agents created by users.
- `id` (uuid, PK, default gen_random_uuid())
- `user_id` (uuid, FK references profiles.id)
- `name` (text) - e.g., "Customer Support Bot"
- `description` (text, nullable)
- `status` (text) - e.g., 'active', 'inactive', 'draft' (default 'draft')
- `language` (text) - e.g., 'en-US', 'es-ES' (default 'en-US')
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### 3. `voice_settings`
Stores specific voice customization parameters for an agent. One-to-one with agents.
- `id` (uuid, PK, default gen_random_uuid())
- `agent_id` (uuid, FK references agents.id, unique)
- `voice_id` (text) - External provider voice ID (e.g., ElevenLabs ID)
- `stability` (float) - Voice stability setting (0.0 - 1.0)
- `similarity_boost` (float) - Voice similarity setting (0.0 - 1.0)
- `pitch` (float) - Custom pitch adjustment
- `speed` (float) - Speaking rate
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

### 4. `agent_sessions`
Tracks interactions/sessions with an agent for analytics.
- `id` (uuid, PK, default gen_random_uuid())
- `agent_id` (uuid, FK references agents.id)
- `start_time` (timestamptz, default now())
- `end_time` (timestamptz, nullable)
- `duration_seconds` (integer, nullable)
- `client_ip` (text, nullable) - For location analytics (hashed/anonymized if needed)
- `platform` (text, nullable) - e.g., "web", "mobile"

### 5. `analytics_events`
Granular events within a session.
- `id` (uuid, PK, default gen_random_uuid())
- `session_id` (uuid, FK references agent_sessions.id)
- `event_type` (text) - e.g., "voice_generated", "error", "user_interrupted"
- `payload` (jsonb) - Flexible storage for event details
- `created_at` (timestamptz, default now())

## Relationships
- `profiles` 1 -> N `agents`
- `agents` 1 -> 1 `voice_settings`
- `agents` 1 -> N `agent_sessions`
- `agent_sessions` 1 -> N `analytics_events`

## Security Policies (RLS)
- Users can only read/write their own profiles.
- Users can only read/write their own agents.
- Users can only read/write voice settings for their own agents.
- Users can only read analytics for their own agents.
