import { firey } from "@/utils"
import React from "react"

type Props = {
  name: string
  customName?: string
  values: string[]
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  className?: string
}

export default function BasicSelection({
  name,
  customName,
  className,
  values,
  onChange,
}: Props) {
  const newName = customName ? firey.camelize(customName) : firey.camelize(name)
  return (
    <div className={className}>
      <h4 className="text-sm font-semibold opacity-90 mb-0.5">{name}</h4>
      <select
        onChange={onChange}
        name={newName}
        className="py-1.5 px-1.5 pe-9 block w-full bg-gray-200 border border-neutral-300 dark:border-neutral-600 text-sm font-medium rounded-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:text-neutral-400"
      >
        {values.map((item, idx) => (
          <option
            key={`selection-${newName.toLowerCase().trim()}-${idx}`}
            value={item}
            // selected={item === selected}
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}
