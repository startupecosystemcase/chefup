'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { OnboardingFormData } from '@/types/onboarding.types'
import type { EmployerOnboardingFormData } from '@/types/employer.types'
import type { PortfolioPost, SocialLinks } from '@/types/portfolio.types'
import type { JobPosting } from '@/types/job.types'
import type { EducationItem, Enrollment, Certificate } from '@/types/education.types'
import type { Event, Participation } from '@/types/events.types'
import type { Response } from '@/types/responses.types'
import type { EducationItem, Enrollment, Certificate } from '@/types/education.types'

export type UserRole = 'applicant' | 'employer' | 'moderator'

interface AuthState {
  userId: string | null
  userRole: UserRole | null
  username: string | null
  setUserId: (id: string) => void
  setUserRole: (role: UserRole) => void
  setUsername: (username: string) => void
  clearAuth: () => void
  subscriptionStatus: 'BASIC' | 'PRO'
  setSubscriptionStatus: (status: 'BASIC' | 'PRO') => void
  notifications: boolean
  setNotifications: (enabled: boolean) => void
  profilePrivacy: 'public' | 'private'
  setProfilePrivacy: (privacy: 'public' | 'private') => void
}

interface OnboardingState {
  formData: Partial<OnboardingFormData>
  setFormData: (data: Partial<OnboardingFormData>) => void
  clearFormData: () => void
}

interface EmployerOnboardingState {
  formData: Partial<EmployerOnboardingFormData>
  setFormData: (data: Partial<EmployerOnboardingFormData>) => void
  clearFormData: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      userRole: null,
      username: null,
      setUserId: (id: string) => set({ userId: id }),
      setUserRole: (role: UserRole) => set({ userRole: role }),
      setUsername: (username: string) => set({ username }),
      clearAuth: () => set({ userId: null, userRole: null, username: null, subscriptionStatus: 'BASIC', notifications: true, profilePrivacy: 'public' }),
      subscriptionStatus: 'BASIC',
      setSubscriptionStatus: (status: 'BASIC' | 'PRO') => set({ subscriptionStatus: status }),
      notifications: true,
      setNotifications: (enabled: boolean) => set({ notifications: enabled }),
      profilePrivacy: 'public',
      setProfilePrivacy: (privacy: 'public' | 'private') => set({ profilePrivacy: privacy }),
    }),
    {
      name: 'chefapp-auth',
      storage: typeof window !== 'undefined' 
        ? createJSONStorage(() => localStorage)
        : undefined,
    }
  )
)

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      formData: {},
      setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      clearFormData: () => set({ formData: {} }),
    }),
    {
      name: 'chefapp-onboarding',
      storage: typeof window !== 'undefined'
        ? createJSONStorage(() => localStorage)
        : undefined,
    }
  )
)

export const useEmployerOnboardingStore = create<EmployerOnboardingState>()(
  persist(
    (set) => ({
      formData: {},
      setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
      clearFormData: () => set({ formData: {} }),
    }),
    {
      name: 'chefapp-employer-onboarding',
      storage: typeof window !== 'undefined'
        ? createJSONStorage(() => localStorage)
        : undefined,
    }
  )
)

interface PortfolioState {
  posts: PortfolioPost[]
  socialLinks: SocialLinks
  addPost: (post: Omit<PortfolioPost, 'id' | 'createdAt'>) => void
  updatePost: (id: string, post: Partial<PortfolioPost>) => void
  deletePost: (id: string) => void
  setSocialLinks: (links: SocialLinks) => void
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      posts: [],
      socialLinks: {},
      addPost: (post) => {
        const newPost: PortfolioPost = {
          ...post,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ posts: [newPost, ...state.posts] }))
      },
      updatePost: (id, updates) => {
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === id
              ? { ...post, ...updates, updatedAt: new Date().toISOString() }
              : post
          ),
        }))
      },
      deletePost: (id) => {
        set((state) => ({ posts: state.posts.filter((post) => post.id !== id) }))
      },
      setSocialLinks: (links) => set({ socialLinks: links }),
    }),
    {
      name: 'chefapp-portfolio',
      storage: typeof window !== 'undefined'
        ? createJSONStorage(() => localStorage)
        : undefined,
    }
  )
)

interface EmployerJobsState {
  jobs: JobPosting[]
  addJob: (job: Omit<JobPosting, 'id' | 'createdAt' | 'status' | 'employerId'>, employerId: string) => void
  updateJob: (id: string, updates: Partial<JobPosting>) => void
  deleteJob: (id: string) => void
  getJobById: (id: string) => JobPosting | undefined
}

export const useEmployerJobsStore = create<EmployerJobsState>()(
  persist(
    (set, get) => ({
      jobs: [],
      addJob: (jobData, employerId) => {
        const newJob: JobPosting = {
          ...jobData,
          id: Date.now().toString(),
          employerId,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ jobs: [newJob, ...state.jobs] }))
      },
      updateJob: (id, updates) => {
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === id
              ? { ...job, ...updates, updatedAt: new Date().toISOString() }
              : job
          ),
        }))
      },
      deleteJob: (id) => {
        set((state) => ({ jobs: state.jobs.filter((job) => job.id !== id) }))
      },
      getJobById: (id) => {
        return get().jobs.find((job) => job.id === id)
      },
    }),
    {
      name: 'chefapp-employer-jobs',
      storage: typeof window !== 'undefined'
        ? createJSONStorage(() => localStorage)
        : undefined,
    }
  )
)

interface EducationState {
  items: EducationItem[]
  enrollments: Enrollment[]
  certificates: Certificate[]
  addEducation: (item: Omit<EducationItem, 'id' | 'createdAt' | 'status'>, authorId: string) => void
  updateEducation: (id: string, updates: Partial<EducationItem>) => void
  deleteEducation: (id: string) => void
  enroll: (userId: string, educationId: string) => void
  completeEducation: (enrollmentId: string) => void
  issueCertificate: (enrollmentId: string, educationId: string, educationTitle: string) => void
  getEducationById: (id: string) => EducationItem | null
  getUserEnrollments: (userId: string) => Enrollment[]
  getUserCertificates: (userId: string) => Certificate[]
}

export const useEducationStore = create<EducationState>()(
  persist(
    (set, get) => ({
      items: [],
      enrollments: [],
      certificates: [],
      addEducation: (item, authorId) => {
        const newItem: EducationItem = {
          ...item,
          id: Date.now().toString(),
          authorId,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ items: [newItem, ...state.items] }))
      },
      updateEducation: (id, updates) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, ...updates, updatedAt: new Date().toISOString() }
              : item
          ),
        }))
      },
      deleteEducation: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }))
      },
      enroll: (userId, educationId) => {
        const enrollment: Enrollment = {
          id: Date.now().toString(),
          userId,
          educationId,
          status: 'enrolled',
          enrolledAt: new Date().toISOString(),
        }
        set((state) => ({ enrollments: [enrollment, ...state.enrollments] }))
      },
      completeEducation: (enrollmentId) => {
        set((state) => ({
          enrollments: state.enrollments.map((enrollment) =>
            enrollment.id === enrollmentId
              ? { ...enrollment, status: 'completed', completedAt: new Date().toISOString() }
              : enrollment
          ),
        }))
      },
      issueCertificate: (enrollmentId, educationId, educationTitle) => {
        const state = get()
        const enrollment = state.enrollments.find((e) => e.id === enrollmentId)
        if (!enrollment) return

        const certificate: Certificate = {
          id: Date.now().toString(),
          userId: enrollment.userId,
          educationId,
          educationTitle,
          issuedAt: new Date().toISOString(),
          certificateNumber: `CERT-${Date.now()}-${enrollment.userId.slice(0, 8)}`,
          verificationUrl: typeof window !== 'undefined' 
            ? `${window.location.origin}/certificates/${Date.now()}-${enrollment.userId.slice(0, 8)}`
            : '',
        }

        set((currentState) => ({
          certificates: [certificate, ...currentState.certificates],
          enrollments: currentState.enrollments.map((e) =>
            e.id === enrollmentId
              ? { ...e, status: 'certified', certificateId: certificate.id }
              : e
          ),
        }))
      },
      getEducationById: (id) => {
        const state = get()
        return state.items.find((item) => item.id === id) || null
      },
      getUserEnrollments: (userId) => {
        const state = get()
        return state.enrollments.filter((e) => e.userId === userId)
      },
      getUserCertificates: (userId) => {
        const state = get()
        return state.certificates.filter((c) => c.userId === userId)
      },
    }),
    {
      name: 'chefapp-education',
      storage: typeof window !== 'undefined' 
        ? createJSONStorage(() => localStorage)
        : undefined,
    }
  )
)

interface EventsState {
  events: Event[]
  participations: Participation[]
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'status'>, organizerId: string) => void
  updateEvent: (id: string, updates: Partial<Event>) => void
  deleteEvent: (id: string) => void
  applyForEvent: (userId: string, eventId: string) => void
  moderateParticipation: (participationId: string, status: Participation['status'], comment?: string) => void
  cancelParticipation: (participationId: string) => void
  getEventById: (id: string) => Event | null
  getUserParticipations: (userId: string) => Participation[]
  getEventParticipations: (eventId: string) => Participation[]
}

export const useEventsStore = create<EventsState>()(
  persist(
    (set, get) => ({
      events: [],
      participations: [],
      addEvent: (event, organizerId) => {
        const newEvent: Event = {
          ...event,
          id: Date.now().toString(),
          organizerId,
          status: 'pending',
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ events: [newEvent, ...state.events] }))
      },
      updateEvent: (id, updates) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? { ...event, ...updates, updatedAt: new Date().toISOString() }
              : event
          ),
        }))
      },
      deleteEvent: (id) => {
        set((state) => ({ events: state.events.filter((event) => event.id !== id) }))
      },
      applyForEvent: (userId, eventId) => {
        const participation: Participation = {
          id: Date.now().toString(),
          userId,
          eventId,
          status: 'pending',
          appliedAt: new Date().toISOString(),
        }
        set((state) => ({ participations: [participation, ...state.participations] }))
      },
      moderateParticipation: (participationId, status, comment) => {
        set((state) => ({
          participations: state.participations.map((participation) =>
            participation.id === participationId
              ? {
                  ...participation,
                  status,
                  moderatedAt: new Date().toISOString(),
                  moderatorComment: comment,
                }
              : participation
          ),
        }))
      },
      cancelParticipation: (participationId) => {
        set((state) => ({
          participations: state.participations.map((participation) =>
            participation.id === participationId
              ? { ...participation, status: 'cancelled' as const }
              : participation
          ),
        }))
      },
      getEventById: (id) => {
        const state = get()
        return state.events.find((event) => event.id === id) || null
      },
      getUserParticipations: (userId) => {
        const state = get()
        return state.participations.filter((p) => p.userId === userId)
      },
      getEventParticipations: (eventId) => {
        const state = get()
        return state.participations.filter((p) => p.eventId === eventId)
      },
    }),
    {
      name: 'chefapp-events',
      storage: typeof window !== 'undefined' 
        ? createJSONStorage(() => localStorage)
        : undefined,
    }
  )
)

interface ResponseState {
  responses: Response[]
  addResponse: (response: Omit<Response, 'id' | 'createdAt'>) => void
  updateResponseStatus: (responseId: string, status: Response['status'], comment?: string) => void
  getResponseByJobId: (jobId: string, applicantId: string) => Response | undefined
  getUserResponses: (applicantId: string) => Response[]
}

export const useResponseStore = create<ResponseState>()(
  persist(
    (set, get) => ({
      responses: [],
      addResponse: (response) => {
        const newResponse: Response = {
          ...response,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ responses: [...state.responses, newResponse] }))
      },
      updateResponseStatus: (responseId, status, comment) =>
        set((state) => ({
          responses: state.responses.map((r) =>
            r.id === responseId
              ? {
                  ...r,
                  status,
                  employerComment: comment,
                  viewedAt: status === 'viewed' || status === 'interested' || status === 'rejected' 
                    ? new Date().toISOString() 
                    : r.viewedAt,
                }
              : r
          ),
        })),
      getResponseByJobId: (jobId, applicantId) => {
        const state = get()
        return state.responses.find((r) => r.jobId === jobId && r.applicantId === applicantId)
      },
      getUserResponses: (applicantId) => {
        const state = get()
        return state.responses.filter((r) => r.applicantId === applicantId)
      },
    }),
    {
      name: 'chefapp-responses',
      storage: typeof window !== 'undefined'
        ? createJSONStorage(() => localStorage)
        : undefined,
    }
  )
)

