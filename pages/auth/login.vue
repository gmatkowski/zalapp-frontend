<template>
  <v-container class='d-flex justify-center' style='height:100%;'>
    <v-row class='d-flex justify-center align-center'>
      <v-col sm='12' md='6' lg='4'>
        <v-card>
          <v-card-title>SingIn</v-card-title>
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
                  name='Password'
                  rules='required|min:8'
                  tag='div'
                  vid='password'
                >
                  <label class='subtitle-2' for='Password'>Password</label>
                  <v-text-field
                    id='Password'
                    v-model='password'
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :error-messages='errors'
                    label='Password'
                    placeholder='Password'
                    :type="showPassword ? 'text' : 'password'"
                    name='password'
                    outlined
                    required
                    @click:append='showPassword = !showPassword'
                  ></v-text-field>
                </validation-provider>

                <v-btn
                  :loading='isLoading'
                  block
                  class='mt-2'
                  color='primary'
                  large
                  type='submit'
                  width='100%'
                >Sing In
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
import {transformNodeFormErrorsToVeeValidate} from '~/utils'

export default {
  auth: 'guest',
  data() {
    return {
      email: null,
      password: null,
      isLoading: false,
      showPassword: false
    }
  },
  head() {
    return {
      title: 'SingIn'
    }
  },
  methods: {
    async submit() {
      this.isLoading = true
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        this.isLoading = false
        await this.$router.push({ name: 'note' })
      } catch (err) {
        this.isLoading = false
        const { response } = err

        if (response && response.status === 422) {
          this.$refs.observer.setErrors(
            transformNodeFormErrorsToVeeValidate(response.data.errors)
          )

          return
        }

        this.$refs.observer.setErrors({
          email: 'Login incorrect'
        })
      }
    }
  }
}
</script>
