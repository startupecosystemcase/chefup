'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { MapPin, Briefcase, Clock, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react'
import { mockJobs } from '@/lib/mockData'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function PublicJobPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const job = mockJobs.find((j) => j.id === id)

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-4xl">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Вакансия не найдена</p>
                <Button onClick={() => router.push('/')}>
                  На главную
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 p-6 md:p-8">
        <div className="mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            На главную
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl mb-4">{job.title}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {job.city}, {job.country}
                </Badge>
                <Badge variant="outline">
                  <Briefcase className="w-3 h-3 mr-1" />
                  {job.position}
                </Badge>
                <Badge variant="outline">
                  <Clock className="w-3 h-3 mr-1" />
                  {job.experience}
                </Badge>
                <Badge variant="secondary">{job.cuisine}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Зарплата
                </h3>
                <p className="text-lg font-semibold text-primary">{job.salary}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Описание</h3>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Требования</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              <Button className="w-full" asChild>
                <a href="/auth">Зарегистрироваться для отклика</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

