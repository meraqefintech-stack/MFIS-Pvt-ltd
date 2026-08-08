import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { seedServices, seedLeads, seedEmployees } from './seed';

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL SENT' | 'NEGOTIATION' | 'WON' | 'LOST' | 'FOLLOW-UP';

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  createdBy: string;
}

export interface Lead {
  id: string;
  leadReference: string;
  fullName: string;
  companyName: string;
  mobile: string;
  email: string;
  service: string;
  city: string;
  businessType: string;
  estimatedRequirement: string;
  preferredContact: string;
  message: string;
  source: string;
  status: LeadStatus;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
  nextFollowUp?: string;
  notes: Note[];
}

export interface FollowUp {
  id: string;
  leadId: string;
  date: string;
  time: string;
  type: string;
  notes: string;
  status: 'PENDING' | 'COMPLETED';
}

interface AppState {
  leads: Lead[];
  services: typeof seedServices;
  employees: typeof seedEmployees;
  followUps: FollowUp[];
  notifications: any[];
  addLead: (lead: Omit<Lead, 'id' | 'leadReference' | 'createdAt' | 'updatedAt' | 'notes' | 'status'>) => string;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  addNote: (leadId: string, content: string, createdBy: string) => void;
  assignLead: (leadId: string, employeeId: string) => void;
  addFollowUp: (followUp: Omit<FollowUp, 'id' | 'status'>) => void;
  completeFollowUp: (id: string) => void;
}

const generateLeadRef = () => {
  return `MRQ-${Math.floor(100000 + Math.random() * 900000)}`;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      leads: seedLeads as Lead[],
      services: seedServices,
      employees: seedEmployees,
      followUps: [],
      notifications: [],

      addLead: (leadData) => {
        const newLead: Lead = {
          ...leadData,
          id: uuidv4(),
          leadReference: generateLeadRef(),
          status: 'NEW',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          notes: []
        };
        
        set((state) => ({
          leads: [newLead, ...state.leads],
          notifications: [{
            id: uuidv4(),
            title: 'New enquiry received',
            customer: newLead.fullName,
            service: newLead.service,
            leadRef: newLead.leadReference,
            time: new Date().toISOString(),
            read: false
          }, ...state.notifications]
        }));
        
        return newLead.leadReference;
      },

      updateLeadStatus: (id, status) => {
        set((state) => ({
          leads: state.leads.map(lead => 
            lead.id === id 
              ? { ...lead, status, updatedAt: new Date().toISOString() } 
              : lead
          )
        }));
      },

      addNote: (leadId, content, createdBy) => {
        set((state) => ({
          leads: state.leads.map(lead => 
            lead.id === leadId 
              ? { 
                  ...lead, 
                  notes: [...lead.notes, { id: uuidv4(), content, createdAt: new Date().toISOString(), createdBy }],
                  updatedAt: new Date().toISOString()
                } 
              : lead
          )
        }));
      },

      assignLead: (leadId, employeeId) => {
        set((state) => ({
          leads: state.leads.map(lead => 
            lead.id === leadId 
              ? { ...lead, assignedTo: employeeId, updatedAt: new Date().toISOString() } 
              : lead
          )
        }));
      },

      addFollowUp: (data) => {
        set((state) => ({
          followUps: [...state.followUps, { ...data, id: uuidv4(), status: 'PENDING' }]
        }));
      },

      completeFollowUp: (id) => {
        set((state) => ({
          followUps: state.followUps.map(fu => fu.id === id ? { ...fu, status: 'COMPLETED' } : fu)
        }));
      }
    }),
    {
      name: 'meraqe-storage',
    }
  )
);
