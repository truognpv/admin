import { ReactNode } from 'react'

export const PageHeader = ({ title, children }: { title: string; children?: ReactNode }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-2xl text-gray-600 font-bold">{title}</p>
      {children}
    </div>
  )
}
