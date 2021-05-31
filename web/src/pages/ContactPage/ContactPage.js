import {
  Form,
  TextField,
  Submit,
  TextAreaField,
  FieldError,
  FormError,
} from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'
import { useMutation } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Gotcha, thanks for giving us your contact info!!')
      formMethods.reset()
    },
  })

  const onSubmit = async (data) => {
    try {
      await create({ variables: { input: data } })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Toaster />
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderBlush' }}
        />

        <label htmlFor="name" errorClassName="error">
          Name
        </label>
        <TextField
          name="name"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="name" className="error" />

        <label htmlFor="email" errorClassName="error">
          Email
        </label>
        <TextField
          name="email"
          validation={{
            required: true,
            // pattern: {
            //   value: /[^@]+@[^.]+\..+/,
            //   message: 'Please enter a valid email address',
            // },
          }}
          errorClassName="error"
        />
        <FieldError name="email" className="error" />

        <label htmlFor="message" errorClassName="error">
          Message
        </label>
        <TextAreaField
          name="message"
          validation={{ required: true }}
          errorClassName="error"
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Save</Submit>
      </Form>
    </>
  )
}

export default ContactPage
