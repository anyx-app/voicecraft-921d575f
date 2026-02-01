import { useEffect, useState, useCallback } from 'react'
import { Plus, MoreHorizontal, Pencil, Trash, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import { DashboardLayout } from '@/components/recipes/layouts/DashboardLayout'
import { DataTable } from '@/components/recipes/dashboard/DataTable'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { supabase } from '@/sdk/supabase'
import { useToast } from '@/hooks/use-toast'

// Type definition based on schema
interface Agent {
  id: string
  name: string
  description: string | null
  status: 'draft' | 'active' | 'archived'
  created_at: string
  updated_at: string
}

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const navigate = useNavigate()

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      if (data) {
        setAgents(data as Agent[])
      }
    } catch (error) {
      console.error('Error fetching agents:', error)
      // Fallback to mock data if DB connection fails (for demo purposes)
      // In a real app, we might want to show an error state instead
      if (process.env.NODE_ENV === 'development' || !import.meta.env.VITE_SUPABASE_URL) {
        console.log('Falling back to mock data')
        setAgents(MOCK_AGENTS)
      } else {
        toast({
          title: 'Error',
          description: 'Failed to fetch agents. Please try again.',
          variant: 'destructive',
        })
      }
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    fetchAgents()
  }, [fetchAgents])

  const handleDelete = async (id: string) => {
    // Optimistic update
    setAgents(agents.filter(a => a.id !== id))
    
    try {
      const { error } = await supabase
        .from('agents')
        .delete()
        .eq('id', id)

      if (error) throw error

      toast({
        title: 'Agent deleted',
        description: 'The agent has been successfully deleted.',
      })
    } catch (error) {
      console.error('Error deleting agent:', error)
      // Revert on error
      fetchAgents()
      toast({
        title: 'Error',
        description: 'Failed to delete agent.',
        variant: 'destructive',
      })
    }
  }

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      sortable: true,
      cell: ({ row }: { row: { original: Agent } }) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.name}</span>
          {row.original.description && (
            <span className="text-xs text-muted-foreground truncate max-w-[200px]">
              {row.original.description}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: { row: { original: Agent } }) => {
        const status = row.original.status || 'draft'
        const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
          active: 'default',
          draft: 'secondary',
          archived: 'outline',
        }
        return (
          <Badge variant={variants[status] || 'secondary'} className="capitalize">
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: 'created_at',
      header: 'Created',
      sortable: true,
      cell: ({ row }: { row: { original: Agent } }) => {
        try {
          return format(new Date(row.original.created_at), 'MMM d, yyyy')
        } catch (e) {
          return row.original.created_at
        }
      },
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }: { row: { original: Agent } }) => {
        const agent = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigate(`/agents/${agent.id}`)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/agents/${agent.id}/edit`)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Agent
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive"
                onClick={() => handleDelete(agent.id)}
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete Agent
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <DataTable
          title="My Agents"
          description="Manage your AI voice agents here."
          columns={columns}
          data={agents}
          loading={loading}
          searchable
          searchPlaceholder="Search agents..."
          emptyMessage="No agents found. Create your first one!"
          actions={
            <Button onClick={() => navigate('/agents/new')}>
              <Plus className="mr-2 h-4 w-4" />
              Create Agent
            </Button>
          }
        />
      </div>
    </DashboardLayout>
  )
}

// Mock data for development/fallback
const MOCK_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description: 'Handles general inquiries and FAQs',
    status: 'active',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Sales Assistant',
    description: 'Qualifies leads and schedules appointments',
    status: 'draft',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Legacy Voice Bot',
    description: 'Old version of the main assistant',
    status: 'archived',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    updated_at: new Date().toISOString(),
  },
]

