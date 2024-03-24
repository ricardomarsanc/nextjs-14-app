import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import Form from '@/app/ui/invoices/edit-form'
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data'

async function UpdateInvoice({ params }: { params: { id: string } }) {
  const { id } = params

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Update invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </div>
  )
}

export default UpdateInvoice
