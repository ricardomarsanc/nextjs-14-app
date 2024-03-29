'use server'

import { sql } from '@vercel/postgres'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer',
    required_error: 'Please select a customer',
  }),
  amount: z.coerce.number().gt(0, 'Please enter an amount greater than $0.'),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select a status',
    required_error: 'Please select a status',
  }),
  date: z.string(),
})

export type State = {
  errors?: {
    customerId?: string[]
    amount?: string[]
    status?: string[]
  }
  message?: string | null
}

const CreateInvoice = FormSchema.omit({ id: true, date: true })

async function createInvoice(prevState: State, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())

  const validateFields = CreateInvoice.safeParse(rawFormData)

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create invoice.',
    }
  }

  const { amount, customerId, status } = CreateInvoice.parse(rawFormData)
  const amountInCents = amount * 100
  const date = new Date().toISOString().split('T')[0]

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `
  } catch (err) {
    return {
      message: 'Database error: Failed to create invoice.',
    }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true })

async function updateInvoice(id: string, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())

  const { amount, customerId, status } = UpdateInvoice.parse(rawFormData)
  const amountInCents = amount * 100

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
      `
  } catch (err) {
    return {
      message: 'Database error: Failed to update invoice.',
    }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices')
}

async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`
    revalidatePath('/dashboard/invoices')
    return { message: 'Deleted Invoice.' }
  } catch (err) {
    return {
      message: 'Database error: Failed to delete invoice.',
    }
  }
}

async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData)
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case 'CredentialsSignin':
          return 'Invaild credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw err
  }
}

export { authenticate, createInvoice, updateInvoice, deleteInvoice }
