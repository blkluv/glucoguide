"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import {
  Button,
  Checkbox,
  Icon,
  Modal,
  RadioInput,
  DoctorDates,
} from "@/components"
import { appointmentModes, appointmentPurposes } from "@/lib/dummy/appointments"
import { AppointmentCreationProps, TDoctor } from "@/types"
import {
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  startOfToday,
} from "date-fns"
import { useApiMutation } from "@/hooks/useApiMutation"
import { patientService } from "@/lib/services/patient"
import { queryClient } from "@/app/providers"
import { useProfile } from "@/hooks/useProfile"
import { usePathname, useRouter } from "next/navigation"

type Props = {
  active: boolean
  closeHandler: () => void
  doctor: TDoctor
  type?: "profile" | "general"
}

export default function AppointmentModal({
  active,
  closeHandler,
  doctor,
  type = "general",
}: Props) {
  // get current day
  const today = startOfToday()
  // get the first day of the current month
  const firstDayCurrentMonth = startOfMonth(today)
  // loop through the current month and get a preview of the dates
  const previewDays = eachDayOfInterval({
    start: startOfMonth(firstDayCurrentMonth),
    end: endOfMonth(firstDayCurrentMonth),
  })

  const [details, setDetails] = useState<AppointmentCreationProps>({
    doctor: doctor.name,
    hospital: doctor.hospital.name,
    address: doctor.hospital.address,
    appointmentMode: "In-Person Consultation",
    purposeOfVisit: ["General Checkup"],
    selectedDate: today,
    selectedMonth: format(today, "MMMM"),
    selectedMonthDays: previewDays,
    notes: "",
    availableDays: doctor.availableTimes.split(":")[0].split(", "),
    time: doctor.availableTimes.split(": ")[1],
  })

  // create appointment
  const { mutate } = useApiMutation<{
    payload: Record<string, unknown>
  }>(({ payload }, token) => patientService.createAppointment(token, payload), {
    onSuccess: () => {
      queryClient.invalidateQueries(`patients:appointments:upcoming`)
      queryClient.invalidateQueries(`patients:appointments:page:1`)
      handleModalClose()
    },
  })

  // handle month selection
  function handleMonthSelection(month: string) {
    const newDate = new Date(`${month} 1 ${format(today, "y")}`)
    const newPreviewDays = eachDayOfInterval({
      start: startOfMonth(newDate),
      end: endOfMonth(newDate),
    })

    setDetails((prev) => ({
      ...prev,
      selectedMonth: month,
      selectedMonthDays: newPreviewDays,
    }))
  }

  // handle date selection
  function handleDateSelection(date: Date, month?: string) {
    const newPreviewDays = eachDayOfInterval({
      start: startOfMonth(date),
      end: endOfMonth(date),
    })
    setDetails((prev) => ({
      ...prev,
      selectedDate: date,
      selectedMonth: month ? month : prev.selectedMonth,
      selectedMonthDays: month ? newPreviewDays : prev.selectedMonthDays,
    }))
  }

  // handle appointment mode
  function handleAppointmentMode(e: React.ChangeEvent<HTMLInputElement>) {
    setDetails((prev) => ({
      ...prev,
      appointmentMode: e.target.value,
    }))
  }

  // handle purpose selection
  function handlePurposeOfVisit(e: React.ChangeEvent<HTMLInputElement>) {
    setDetails((prev) => {
      const value = e.target.value
      const exist = prev.purposeOfVisit.includes(value)
      const purposesOfVisit = exist
        ? prev.purposeOfVisit.filter((item) => item !== value)
        : prev.purposeOfVisit.concat(value)
      return { ...prev, purposeOfVisit: purposesOfVisit }
    })
  }

  // handle special notes
  function handleSpecialNotes(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDetails((prev) => ({ ...prev, notes: e.target.value }))
  }

  // handle modal close
  function handleModalClose() {
    setDetails((prev) => ({ ...prev, purposeOfVisit: ["General Checkup"] })) // set back to initial state
    closeHandler()
  }

  // handle modal confirmation
  function handleConfirmation(details: AppointmentCreationProps) {
    // restructure payload for api
    const payload = {
      doctor_id: doctor.id,
      mode: details.appointmentMode.startsWith("Telemedicine")
        ? "online"
        : "in-person",
      purpose_of_visit: details.purposeOfVisit,
      appointment_date: format(details.selectedDate, "yyyy-MM-dd"),
      appointment_time: details.time,
      ...(details.notes.length > 0 && { patient_note: details.notes }), // add notes conditionally
    }

    mutate({ payload })
  }

  // update the available time of doctors (selected date carousel)
  useEffect(() => {
    const today = startOfToday()

    setDetails((prev) => ({
      ...prev,
      selectedDate: today,
      doctor: doctor.name,
      availableDays: doctor.availableTimes.split(":")[0].split(", "),
      time: doctor.availableTimes.split(": ")[1],
    }))
  }, [doctor])

  return (
    <React.Fragment>
      <Modal
        open={active}
        handler={handleModalClose}
        className="h-full sm:h-3/4 w-full max-w-[720px]"
        direction="center"
        secondaryBtn={
          <Button onClick={() => handleConfirmation(details)}>Confirm</Button>
        }
      >
        <div className="overflow-x-hidden overflow-y-auto custom-scroll">
          {/* doctor details for clicks from profile buttons */}
          {type === "profile" && doctor && (
            <div className="p-6 center flex-col">
              {/* doctor image */}
              <div className="relative size-32">
                <Image
                  fill
                  src={doctor.imgSrc}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="doctor.png"
                  style={{ objectFit: "cover", filter: "contrast(0.9)" }}
                  priority
                  className="rounded-lg"
                />
              </div>
              {/* doctor description */}
              <div className="center flex-col mt-2 ml-1 max-w-64">
                <h4 className="text-base ml-1 md:text-xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                  {doctor.name}
                </h4>
                <p className="text-xs text-center font-bold opacity-80 leading-4 line-clamp-3">
                  {doctor.description}
                </p>
                <div className="flex items-center opacity-80 mt-1 -ml-1">
                  <div>
                    <Icon name="pin" className="size-4 -mt-0.5 mr-0.5" />
                  </div>
                  <h4 className="text-xs font-bold line-clamp-1">
                    {doctor.hospital.name}
                  </h4>
                </div>
              </div>
            </div>
          )}

          <DoctorDates
            values={details}
            dateSelection={handleDateSelection}
            monthSelection={handleMonthSelection}
          />

          {/* appointment selection options */}
          <div className="px-4 w-full flex flex-col my-6">
            {/* Appointment Mode */}
            <fieldset>
              <legend className="ml-1 text-sm md:text-base font-bold opacity-70">
                Appointment mode
              </legend>
              <div className="flex flex-col mt-1 text-sm">
                {appointmentModes.map((item, idx) => (
                  <RadioInput
                    key={`mealPerDayOpts-${idx}`}
                    name={`appointment_mode_${idx}`}
                    value={item}
                    active={details.appointmentMode === item}
                    onChange={handleAppointmentMode}
                    labelClass="ml-1"
                  />
                ))}
              </div>
            </fieldset>

            {/* purpose of visit */}
            <fieldset className="mt-4">
              <legend className="ml-1 text-sm md:text-base font-bold opacity-70">
                Purpose of visit
              </legend>

              {/* purpose of visit options */}
              <div className="flex flex-col mt-2 text-sm space-y-2">
                {appointmentPurposes.map((item, idx) => (
                  <Checkbox
                    key={`alergyOpt-${idx}`}
                    name={`purpose_of_visit_${idx}_option`}
                    value={item}
                    active={details.purposeOfVisit.includes(item)}
                    onChange={handlePurposeOfVisit}
                    direction="left"
                    className="rounded-lg py-4 !border-[1px]"
                  />
                ))}
              </div>
            </fieldset>

            {/* special notes */}
            <div className="mt-4">
              <label
                htmlFor="notes"
                className="text-sm md:text-base font-bold opacity-70"
              >
                Special notes
              </label>
              <textarea
                rows={4}
                className="mt-2 p-2 w-full text-sm text-gray-900 dark:text-neutral-400 bg-gray-50 dark:bg-neutral-700 rounded-lg border border-gray-300 dark:focus:border-blue-500 outline-none resize-none"
                placeholder="Write special notes here..."
                value={details.notes}
                onChange={handleSpecialNotes}
              />
            </div>

            {/* appointment details */}
            <div className="mt-4 flex flex-col">
              <h4 className="text-sm md:text-base font-bold opacity-70">
                Appointment details
              </h4>
              <div className="text-sm font-medium">
                <span className="font-bold">Doctor: </span>
                <span>{details.doctor}</span>
              </div>
              <div className="text-sm font-medium">
                <span className="font-bold">Date: </span>
                <span>
                  {format(details.selectedDate, "do MMMM, yyy")} (
                  {format(details.selectedDate, "eeee")})
                </span>
              </div>
              <div className="text-sm font-medium">
                <span className="font-bold">Time: </span>
                <span>{details.time}</span>
              </div>
              <div className="text-sm font-medium">
                <span className="font-bold">Purpose of visit: </span>
                <span>{details.purposeOfVisit.join(", ")}.</span>
              </div>
              <div className="text-sm font-medium">
                <span className="font-bold">Hospital: </span>
                <span>{doctor.hospital.name}.</span>
              </div>
              <div className="text-sm font-medium">
                <span className="font-bold">Location: </span>
                <span>{doctor.hospital.address}.</span>
              </div>
              {details.notes.length !== 0 && (
                <div className="text-sm font-medium">
                  <span className="font-bold">Special note: </span>
                  <span>{details.notes}</span>
                </div>
              )}
            </div>

            {/* important info */}
            <div className="mt-4 flex flex-col text-sm">
              <h4 className="md:text-base font-bold opacity-70">
                Important info
              </h4>
              <span className="font-medium sm:font-medium sm:opacity-80">
                *Please arrive 10-15 minutes early for your appointment.
              </span>
              <span className="font-medium sm:font-medium sm:opacity-80">
                *If you need to reschedule or cancel, kindly notify us at least
                24 hours in advance.
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  )
}
