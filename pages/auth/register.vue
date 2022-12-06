<template>
  <v-container class='d-flex justify-center' style='height:100%;'>
    <v-row class='d-flex justify-center align-center'>
      <v-col sm='12' md='6' lg='4'>
        <v-card>
          <v-card-title>SignUp</v-card-title>
          <v-card-text>

            <validation-observer
              ref='observer'
              v-slot='{ handleSubmit }'
            >
              <v-form ref='form' :disabled='isLoading' @submit.prevent='handleSubmit(submit)'>
                <validation-provider
                  v-slot='{ errors }'
                  name='email'
                  rules='required|email'
                  tag='div'
                  vid='email'
                >
                  <label class='subtitle-2' for='Email'>Email</label>
                  <v-text-field
                    id='Email'
                    v-model='email'
                    :error-messages='errors'
                    label='email'
                    name='email'
                    outlined
                    required
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot='{ errors }'
                  name='first name'
                  rules='required|min:3'
                  tag='div'
                  vid='first_name'
                >
                  <label class='subtitle-2' for='first_name'>First name</label>
                  <v-text-field
                    id='First_name'
                    v-model='first_name'
                    :error-messages='errors'
                    label='First name'
                    name='first_name'
                    outlined
                    required
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot='{ errors }'
                  name='last name'
                  rules='required|min:3'
                  tag='div'
                  vid='last_name'
                >
                  <label class='subtitle-2' for='last_name'>Last name</label>
                  <v-text-field
                    id='last_name'
                    v-model='last_name'
                    :error-messages='errors'
                    label='Last name'
                    name='last_name'
                    outlined
                    required
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot='{ errors }'
                  name='password'
                  rules='required|min:8|password:@password_confirmation'
                  tag='div'
                  vid='password'
                >
                  <v-text-field
                    v-model='password'
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :error-messages='errors'
                    label='Password'
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete='new_password'
                    name='password'
                    outlined
                    @click:append='showPassword = !showPassword'
                  />
                </validation-provider>

                <validation-provider
                  v-slot='{ errors }'
                  name='password confirmation'
                  rules='required|min:8'
                  tag='div'
                  vid='password_confirmation'
                >
                  <v-text-field
                    v-model='password_confirmation'
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :error-messages='errors'
                    label='Password confirmation'
                    :type="showPassword ? 'text' : 'password'"
                    autocomplete='new_password'
                    name='password_confirmation'
                    outlined
                    @click:append='showPassword = !showPassword'
                  />
                </validation-provider>

                <v-btn
                  :loading='isLoading'
                  block
                  class='mt-2'
                  color='primary'
                  large
                  type='submit'
                  width='100%'
                >Sing Up
                </v-btn>
              </v-form>
            </validation-observer>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { transformNodeFormErrorsToVeeValidate } from '~/utils'

export default {
  auth: 'guest',
  data() {
    return {
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      password_confirmation: null,
      isLoading: false,
      showPassword: false
    }
  },
  head() {
    return {
      title: 'SignUp'
    }
  },
  methods: {
    async submit() {
      this.isLoading = true
      try {
        await this.$axios.post('/api/auth/register', {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })

        this.isLoading = false

        this.$notifier.showMessage({ content: 'You can sign in now.', color: 'green' })

        await this.$router.push({ name: 'auth-login' })
      } catch (err) {
        this.isLoading = false
        const { response } = err

        if (response && response.status === 422) {
          this.$refs.observer.setErrors(
            transformNodeFormErrorsToVeeValidate(response.data.errors)
          )
        }
      }
    }
  }
}
</script>
