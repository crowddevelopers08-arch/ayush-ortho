"use client"

import { useState, useEffect, Fragment } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Phone, Mail, Calendar, RefreshCw, Users, FileText, ChevronDown, ChevronUp } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Lead {
  id: string
  name: string
  phone: string
  email: string
  age: string | null
  areaOfPain: string | null
  treatmentPlan: string | null
  city: string | null
  source: string | null
  formName: string | null
  status: 'NEW' | 'CONTACTED' | 'SCHEDULED' | 'CONVERTED' | 'LOST'
  telecrmSynced: boolean
  telecrmId: string | null
  consent: boolean
  createdAt: string
  updatedAt: string
}

interface LeadsTableProps {
  initialLeads?: Lead[]
  autoRefresh?: boolean
  refreshInterval?: number
}

export default function LeadsTable({ 
  initialLeads = [], 
  autoRefresh = false,
  refreshInterval = 30000 
}: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [treatmentFilter, setTreatmentFilter] = useState<string>("all")
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [formFilter, setFormFilter] = useState<string>("all")
  const [expandedLead, setExpandedLead] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/leads')
      const data = await response.json()
      
      if (response.ok) {
        setLeads(data.leads || [])
      } else {
        console.error('Failed to fetch leads:', data.error)
      }
    } catch (error) {
      console.error('Error fetching leads:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(fetchLeads, refreshInterval)
    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval])

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig) return 0
    
    const { key, direction } = sortConfig
    let aValue = a[key as keyof Lead]
    let bValue = b[key as keyof Lead]
    
    if (key === 'createdAt' || key === 'updatedAt') {
      aValue = new Date(aValue as string).getTime()
      bValue = new Date(bValue as string).getTime()
    } else if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = (bValue as string).toLowerCase()
    }
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })

  const safeString = (value: any): string => {
    if (value === null || value === undefined) return ''
    return String(value).toLowerCase()
  }

  const filteredLeads = sortedLeads.filter((lead) => {
    const matchesSearch = 
      safeString(lead.name).includes(safeString(searchTerm)) ||
      safeString(lead.phone).includes(safeString(searchTerm)) ||
      safeString(lead.email).includes(safeString(searchTerm)) ||
      safeString(lead.areaOfPain).includes(safeString(searchTerm)) ||
      safeString(lead.treatmentPlan).includes(safeString(searchTerm)) ||
      safeString(lead.city).includes(safeString(searchTerm)) ||
      safeString(lead.formName).includes(safeString(searchTerm))
    
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesTreatment = treatmentFilter === "all" || lead.treatmentPlan === treatmentFilter
    const matchesDate = dateFilter === "all" || isWithinDateRange(lead.createdAt, dateFilter)
    const matchesForm = formFilter === "all" || lead.formName === formFilter
    
    return matchesSearch && matchesStatus && matchesTreatment && matchesDate && matchesForm
  })

  function isWithinDateRange(date: string, range: string): boolean {
    if (!date) return false
    
    const leadDate = new Date(date)
    const now = new Date()
    
    switch (range) {
      case "today":
        return leadDate.toDateString() === now.toDateString()
      case "week":
        const weekAgo = new Date(now)
        weekAgo.setDate(weekAgo.getDate() - 7)
        return leadDate >= weekAgo
      case "month":
        const monthAgo = new Date(now)
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return leadDate >= monthAgo
      default:
        return true
    }
  }

  const getStatusBadge = (status: Lead['status']) => {
    const statusConfig = {
      NEW: { label: "New", color: "bg-blue-100 text-blue-800 border-blue-200" },
      CONTACTED: { label: "Contacted", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      SCHEDULED: { label: "Scheduled", color: "bg-purple-100 text-purple-800 border-purple-200" },
      CONVERTED: { label: "Converted", color: "bg-green-100 text-green-800 border-green-200" },
      LOST: { label: "Lost", color: "bg-red-100 text-red-800 border-red-200" }
    }
    
    const config = statusConfig[status]
    return <Badge variant="outline" className={`${config.color} border`}>{config.label}</Badge>
  }

  const getFormBadge = (formName: string | null) => {
    if (!formName) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200 text-xs">Unknown</Badge>
    }
    
    const formConfig: { [key: string]: { label: string, color: string } } = {
      'back-pain': { label: "Back Pain", color: "bg-red-100 text-red-800 border-red-200" },
      'common': { label: "Common", color: "bg-blue-100 text-blue-800 border-blue-200" },
      'neck-shoulder': { label: "Neck & Shoulder", color: "bg-green-100 text-green-800 border-green-200" },
      'knee-pain': { label: "Knee Pain", color: "bg-purple-100 text-purple-800 border-purple-200" },
      'default': { label: formName, color: "bg-gray-100 text-gray-800 border-gray-200" }
    }
    
    const config = formConfig[formName.toLowerCase()] || formConfig.default
    return <Badge variant="outline" className={`${config.color} border text-xs`}>{config.label}</Badge>
  }

  const getTelecrmBadge = (synced: boolean) => {
    return synced ? 
      <Badge className="bg-green-100 text-green-800 border-green-200">Synced</Badge> :
      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
  }

  const uniqueFormNames = Array.from(new Set(leads.map(lead => lead.formName).filter(Boolean))) as string[]

  const getFormStats = () => {
    const stats: { [key: string]: { total: number, new: number, converted: number, synced: number } } = {}
    
    leads.forEach(lead => {
      const formName = lead.formName || 'Unknown'
      if (!stats[formName]) {
        stats[formName] = { total: 0, new: 0, converted: 0, synced: 0 }
      }
      
      stats[formName].total++
      if (lead.status === 'NEW') stats[formName].new++
      if (lead.status === 'CONVERTED') stats[formName].converted++
      if (lead.telecrmSynced) stats[formName].synced++
    })
    
    return stats
  }

  const formStats = getFormStats()

  const exportToCSV = () => {
    const headers = ["Name", "Phone", "Email", "Age", "Area of Pain", "Treatment Plan", "City", "Status", "Form Name", "Source", "TeleCRM Synced", "Created At"]
    const csvData = filteredLeads.map(lead => [
      lead.name || '',
      lead.phone || '',
      lead.email || '',
      lead.age || '',
      lead.areaOfPain || '',
      lead.treatmentPlan || '',
      lead.city || '',
      lead.status || '',
      lead.formName || '',
      lead.source || '',
      lead.telecrmSynced ? "Yes" : "No",
      isClient ? new Date(lead.createdAt).toLocaleString('en-IN') : lead.createdAt
    ])
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(","))
      .join("\n")
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleCall = (phone: string) => {
    if (phone) {
      window.open(`tel:${phone}`, '_self')
    }
  }

  const handleEmail = (email: string) => {
    if (email) {
      window.open(`mailto:${email}`, '_self')
    }
  }

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const toggleLeadExpansion = (leadId: string) => {
    setExpandedLead(current => current === leadId ? null : leadId)
  }

  const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      
      if (response.ok) {
        setLeads(leads.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus } : lead
        ))
      }
    } catch (error) {
      console.error('Error updating lead status:', error)
    }
  }

  const formatDate = (dateString: string) => {
    if (!isClient || !dateString) return { date: '', time: '' }
    
    try {
      const date = new Date(dateString)
      return {
        date: date.toLocaleDateString('en-IN'),
        time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }
    } catch {
      return { date: 'Invalid Date', time: '' }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4">
      <Card className="w-full bg-white border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Leads Management</CardTitle>
              <CardDescription className="text-gray-600">
                Manage and track all consultation requests from your website forms
                {autoRefresh && <span className="ml-2 text-xs text-green-600">• Auto-refresh enabled</span>}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={fetchLeads} 
                disabled={loading}
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button 
                onClick={exportToCSV} 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {/* Form Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {Object.entries(formStats).map(([formName, stats]) => (
              <Card key={formName} className="p-4 bg-white border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-sm text-gray-900 capitalize">
                        {formName === 'back-pain' ? 'Back Pain' : 
                         formName === 'neck-shoulder' ? 'Neck & Shoulder' : 
                         formName === 'knee-pain' ? 'Knee Pain' : 
                         formName === 'common' ? 'Common' : 
                         formName === 'Unknown' ? 'Unknown Form' : formName}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                  </div>
                  <div className="text-right text-xs space-y-1">
                    <div className="flex items-center gap-1 justify-end">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">New: {stats.new}</span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Converted: {stats.converted}</span>
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      <span className="text-gray-600">Synced: {stats.synced}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name, phone, email, treatment, form..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <Filter className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all" className="focus:bg-gray-100">All Status</SelectItem>
                <SelectItem value="NEW" className="focus:bg-gray-100">New</SelectItem>
                <SelectItem value="CONTACTED" className="focus:bg-gray-100">Contacted</SelectItem>
                <SelectItem value="SCHEDULED" className="focus:bg-gray-100">Scheduled</SelectItem>
                <SelectItem value="CONVERTED" className="focus:bg-gray-100">Converted</SelectItem>
                <SelectItem value="LOST" className="focus:bg-gray-100">Lost</SelectItem>
              </SelectContent>
            </Select>

            <Select value={treatmentFilter} onValueChange={setTreatmentFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <SelectValue placeholder="Treatment" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all" className="focus:bg-gray-100">All Treatments</SelectItem>
                <SelectItem value="7 Days" className="focus:bg-gray-100">7 Days</SelectItem>
                <SelectItem value="14 Days" className="focus:bg-gray-100">14 Days</SelectItem>
                <SelectItem value="21 Days" className="focus:bg-gray-100">21 Days</SelectItem>
                <SelectItem value="Let the doctor decide" className="focus:bg-gray-100">Doctor Decides</SelectItem>
              </SelectContent>
            </Select>

            <Select value={formFilter} onValueChange={setFormFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Form" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all" className="focus:bg-gray-100">All Forms</SelectItem>
                {uniqueFormNames.map(formName => (
                  <SelectItem key={formName} value={formName} className="focus:bg-gray-100">
                    {formName === 'back-pain' ? 'Back Pain' : 
                     formName === 'neck-shoulder' ? 'Neck & Shoulder' : 
                     formName === 'knee-pain' ? 'Knee Pain' : 
                     formName === 'common' ? 'Common' : formName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="all" className="focus:bg-gray-100">All Time</SelectItem>
                <SelectItem value="today" className="focus:bg-gray-100">Today</SelectItem>
                <SelectItem value="week" className="focus:bg-gray-100">This Week</SelectItem>
                <SelectItem value="month" className="focus:bg-gray-100">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th 
                      className="h-12 px-4 text-left align-middle font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-1">
                        Name
                        {sortConfig?.key === 'name' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Contact</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Treatment</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Form</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Status</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Sync</th>
                    <th 
                      className="h-12 px-4 text-left align-middle font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => handleSort('createdAt')}
                    >
                      <div className="flex items-center gap-1">
                        Date
                        {sortConfig?.key === 'createdAt' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-500">
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Loading leads...
                        </div>
                      </td>
                    </tr>
                  ) : filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-gray-500">
                        No leads found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => {
                      const formattedDate = formatDate(lead.createdAt)
                      return (
                        <Fragment key={lead.id}>
                          <tr 
                            className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => toggleLeadExpansion(lead.id)}
                          >
                            <td className="p-4 align-middle font-medium text-gray-900">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  lead.status === 'NEW' ? 'bg-blue-500' :
                                  lead.status === 'CONTACTED' ? 'bg-yellow-500' :
                                  lead.status === 'SCHEDULED' ? 'bg-purple-500' :
                                  lead.status === 'CONVERTED' ? 'bg-green-500' : 'bg-red-500'
                                }`} />
                                {lead.name || 'Unknown'}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-3 w-3 text-blue-600" />
                                  <span className="text-sm text-gray-700">{lead.phone || 'No phone'}</span>
                                </div>
                                {lead.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-3 w-3 text-blue-600" />
                                    <span className="text-sm text-gray-700 truncate max-w-[120px]">{lead.email}</span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-medium text-gray-900">{lead.treatmentPlan || lead.areaOfPain || "Not specified"}</span>
                                {lead.city && <span className="text-xs text-gray-600">{lead.city}</span>}
                                {lead.age && <span className="text-xs text-gray-600">Age: {lead.age}</span>}
                              </div>
                            </td>
                            <td className="p-4 align-middle">
                              {getFormBadge(lead.formName)}
                            </td>
                            <td className="p-4 align-middle">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <div className="cursor-pointer">
                                    {getStatusBadge(lead.status)}
                                  </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white border-gray-200 text-gray-900">
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'NEW')
                                    }}
                                  >
                                    New
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'CONTACTED')
                                    }}
                                  >
                                    Contacted
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'SCHEDULED')
                                    }}
                                  >
                                    Scheduled
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'CONVERTED')
                                    }}
                                  >
                                    Converted
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    className="focus:bg-gray-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      updateLeadStatus(lead.id, 'LOST')
                                    }}
                                  >
                                    Lost
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                            <td className="p-4 align-middle">
                              {getTelecrmBadge(lead.telecrmSynced)}
                            </td>
                            <td className="p-4 align-middle text-sm text-gray-600">
                              {formattedDate.date}
                              <br />
                              <span className="text-xs">
                                {formattedDate.time}
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="h-8 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCall(lead.phone)
                                  }}
                                  disabled={!lead.phone}
                                >
                                  <Phone className="h-3 w-3" />
                                </Button>
                                {lead.email && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleEmail(lead.email)
                                    }}
                                  >
                                    <Mail className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                          {expandedLead === lead.id && (
                            <tr className="bg-gray-50 border-b border-gray-200">
                              <td colSpan={8} className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Lead Details</h4>
                                    <div className="space-y-2 text-gray-700">
                                      <div><span className="font-medium">Source:</span> {lead.source || 'Not specified'}</div>
                                      <div><span className="font-medium">Age:</span> {lead.age || 'Not specified'}</div>
                                      <div><span className="font-medium">City:</span> {lead.city || 'Not specified'}</div>
                                      <div><span className="font-medium">Area of Pain:</span> {lead.areaOfPain || 'Not specified'}</div>
                                      <div><span className="font-medium">Treatment Plan:</span> {lead.treatmentPlan || 'Not specified'}</div>
                                      <div><span className="font-medium">Consent:</span> {lead.consent ? 'Yes' : 'No'}</div>
                                      {lead.telecrmId && (
                                        <div><span className="font-medium">TeleCRM ID:</span> {lead.telecrmId}</div>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Additional Information</h4>
                                    <p className="text-gray-700 bg-white p-3 rounded border border-gray-200">
                                      {lead.source || "No additional information provided"}
                                    </p>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600 gap-2">
            <div>
              Showing {filteredLeads.length} of {leads.length} leads
              {searchTerm && ` • Filtered by: "${searchTerm}"`}
              {formFilter !== 'all' && ` • Form: ${
                formFilter === 'back-pain' ? 'Back Pain' : 
                formFilter === 'neck-shoulder' ? 'Neck & Shoulder' : 
                formFilter === 'knee-pain' ? 'Knee Pain' : 
                formFilter === 'common' ? 'Common' : formFilter
              }`}
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>New: {leads.filter(l => l.status === 'NEW').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Converted: {leads.filter(l => l.status === 'CONVERTED').length}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <span>Synced: {leads.filter(l => l.telecrmSynced).length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}