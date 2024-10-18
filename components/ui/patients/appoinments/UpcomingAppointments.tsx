"use client"

import { AppoinmentDetailsModal, Appointment } from "@/components"
import { TYPEAPPOINTMENT } from "@/lib/dummy/appointments"
import { format, startOfToday, startOfTomorrow } from "date-fns"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"

type Props = {
  appointmentsToday: TYPEAPPOINTMENT[]
  appointmentsTomorrow: TYPEAPPOINTMENT[]
}

const today = startOfToday()
const tomorrow = startOfTomorrow()

export default function UpcomingAppointments({
  appointmentsToday,
  appointmentsTomorrow,
}: Props) {
  const params = useSearchParams()
  const pathaname = usePathname()
  const router = useRouter()

  const popup = !!params.get("popup")
  const id = params.get("id")

  const [selected, setSelected] = useState<string | null>(null)
  const [openDetailsModal, setOpenDetailsModal] = useState<boolean>(false)

  // get all the combined upcoming appoinments
  const upcomingAppointments = [...appointmentsToday, ...appointmentsTomorrow]

  // handle appointment details modal opening
  function handleOpenDetailsModal(id: string) {
    setSelected(id)
    setOpenDetailsModal(true)
  }

  // handle appointment details modal closing
  function closeDetailsModal() {
    setSelected(null)
    setOpenDetailsModal(false)
    if (!popup) return
    router.replace(pathaname)
  }

  if (upcomingAppointments.length === 0) return <div />

  useEffect(() => {
    if (!popup && !!id) return
    setSelected(id)
    setOpenDetailsModal(true)
  }, [popup])

  return (
    <React.Fragment>
      <div
        className={`bg-slate-200/50 dark:bg-neutral-700 p-4 pb-7 rounded-lg overflow-hidden ${
          upcomingAppointments.length > 0 && `mb-4`
        }`}
      >
        <h2 className="font-extrabold text-lg ml-2 opacity-95">
          Upcoming Appointments
        </h2>

        {/* appointments for today */}
        <div>
          {appointmentsToday.length > 0 && (
            <h5 className="ml-2 my-2 text-sm font-bold opacity-80">
              Today - {format(today, "dd MMMM")}
            </h5>
          )}
          <div className="flex flex-col gap-4">
            {appointmentsToday.map((item, idx) => (
              <Appointment
                key={`appointment-today-${idx}`}
                appointment={item}
                openModal={handleOpenDetailsModal}
              />
            ))}
          </div>
        </div>

        {/* appointments for tomorrow */}
        <div
          className={
            appointmentsTomorrow.length > 0 ? `mt-6 md:mt-8` : `hidden`
          }
        >
          {appointmentsTomorrow.length > 0 && (
            <h5 className="ml-2 my-2 text-sm font-bold opacity-80">
              Tomorrow - {format(tomorrow, "dd MMMM")}
            </h5>
          )}
          <div className="flex flex-col gap-4">
            {appointmentsTomorrow.map((item, idx) => (
              <Appointment
                key={`appointment-tom-${idx}`}
                appointment={item}
                openModal={handleOpenDetailsModal}
              />
            ))}
          </div>
        </div>
      </div>
      <AppoinmentDetailsModal
        isOpen={openDetailsModal}
        closeModal={closeDetailsModal}
        selected={selected}
      />
    </React.Fragment>
  )
}
