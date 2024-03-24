import { lusitana } from '@/app/ui/fonts'
import { CreateInvoice } from '@/app/ui/invoices/buttons'
import Pagination from '@/app/ui/invoices/pagination'
import InvoicesTable from '@/app/ui/invoices/table'
import Search from '@/app/ui/search'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'
import { Suspense } from 'react'
import { fetchInvoicesPages } from '@/app/lib/data'

async function InvoicesPage({
  searchParams,
}: {
  searchParams: { query?: string; page?: string }
}) {
  const { query = '', page = 1 } = searchParams

  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={Number(page)} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}

export default InvoicesPage
