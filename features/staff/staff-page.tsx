'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, parseISO } from 'date-fns'
import { Loader2, Plus, Users } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/shared/layout/page-header'
import { EmptyState } from '@/components/shared/feedback/empty-state'
import { FormFieldWrapper } from '@/components/shared/forms/form-field-wrapper'
import { FormDialog } from '@/components/shared/forms/form-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { createStaffSchema, type CreateStaffInput } from '@/lib/validations/auth'
import { getErrorMessage } from '@/utils/error-message'
import { useCreateStaff, useGetStaff } from '@/services/staff'

export function StaffPage() {
  const { data: staff = [], isLoading } = useGetStaff()
  const createMutation = useCreateStaff()
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateStaffInput>({
    resolver: zodResolver(createStaffSchema),
    defaultValues: { fullName: '', email: '', password: '', role: 'Staff' },
  })

  const role = useWatch({ control, name: 'role' })

  async function onSubmit(data: CreateStaffInput) {
    try {
      await createMutation.mutateAsync(data)
      toast.success('Staff account created')
      setOpen(false)
      reset()
    } catch (err) {
      toast.error(getErrorMessage(err, 'Failed to create staff'))
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Staff" description="Admin-seeded accounts for shop access.">
        <Button onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4" />
          Add staff
        </Button>
      </PageHeader>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading…</p>
      ) : staff.length === 0 ? (
        <EmptyState icon={Users} title="No staff yet" description="Create the first staff login." />
      ) : (
        <div className="bg-card overflow-x-auto rounded-xl border">
          <Table className="min-w-[560px]">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">{person.full_name}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>
                    <Badge variant={person.role === 'Admin' ? 'default' : 'secondary'}>
                      {person.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(parseISO(person.created_at), 'dd MMM yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title="Create staff account"
        description="Create an Admin or Staff login for the shop."
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormFieldWrapper label="Full name" required error={errors.fullName}>
            <Input {...register('fullName')} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Email" required error={errors.email}>
            <Input type="email" {...register('email')} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Password" required error={errors.password}>
            <Input type="password" {...register('password')} />
          </FormFieldWrapper>
          <FormFieldWrapper label="Role" required error={errors.role}>
            <Select
              value={role}
              onValueChange={(value) =>
                setValue('role', (value as 'Admin' | 'Staff') ?? 'Staff')
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Staff">Staff</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </FormFieldWrapper>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </form>
      </FormDialog>
    </div>
  )
}
