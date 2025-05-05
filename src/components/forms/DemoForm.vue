<script setup lang="ts">
import { ref } from 'vue'
import CustomButton from '../core/CustomButton.vue'

const formData = ref({
    email: '',
    company: '',
    deployment: '',
    volume: '',
    referral: '',
})

const status = ref({
    submitted: false,
    submitting: false,
    error: false,
    message: '',
})

const handleSubmit = async () => {
    status.value = { submitted: false, submitting: true, error: false, message: '' }

    try {
        // Replace with your actual form submission logic
        await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call

        status.value = {
            submitted: true,
            submitting: false,
            error: false,
            message: 'Thank you! Your message has been sent successfully.',
        }

        formData.value = {
            email: '',
            company: '',
            deployment: '',
            volume: '',
            referral: '',
        }
    } catch (error) {
        status.value = {
            submitted: false,
            submitting: false,
            error: true,
            message: 'Oops! Something went wrong. Please try again later.',
        }
    }
}

const resetForm = () => {
    status.value = { submitted: false, submitting: false, error: false, message: '' }
}
</script>

<template>
    <div class="w-full mx-auto">
        <div class="contact-form-card">
            <template v-if="status.submitted">
                <div class="contact-form-success">
                    <div class="contact-form-success-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 class="contact-form-success-title">Message Sent!</h3>
                    <p class="contact-form-success-message">{{ status.message }}</p>
                    <button @click="resetForm" class="contact-form-button">
                        Send Another Message
                    </button>
                </div>
            </template>
            <template v-else>
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <!-- Work Email -->
                    <div>
                        <label for="email" class="block font-medium text-sm text-gray-700">Work Email <span
                                class="text-red-500">*</span></label>
                        <input id="email" v-model="formData.email" type="email" placeholder="your.name@company.com"
                            required
                            class="mt-1 w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <!-- Company Name -->
                    <div>
                        <label for="company" class="block font-medium text-sm text-gray-700">Company Name <span
                                class="text-red-500">*</span></label>
                        <input id="company" v-model="formData.company" type="text" placeholder="Acme Inc." required
                            class="mt-1 w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <!-- Deployment Preference -->
                    <div>
                        <label for="deployment" class="block font-medium text-sm text-gray-700">Deployment Preference
                            <span class="text-red-500">*</span></label>
                        <select id="deployment" v-model="formData.deployment" required
                            class="mt-1 w-full px-4 py-2 border rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="" disabled hidden>Select deployment option</option>
                            <option>Cloud (Saas)</option>
                            <option>Self-hosted</option>
                            <option>Hybrid</option>
                            <option>Not sure yet</option>
                        </select>
                    </div>

                    <!-- Data Volume -->
                    <div>
                        <label for="volume" class="block font-medium text-sm text-gray-700">Expected Daily Data Volume
                            <span class="text-red-500">*</span></label>
                        <select id="volume" v-model="formData.volume" required
                            class="mt-1 w-full px-4 py-2 border rounded-md bg-white focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="" disabled hidden>Select data volume</option>
                            <option>Less than 10GB</option>
                            <option>10GB - 100GB</option>
                            <option>100GB - 1TB</option>
                            <option>More than 1TB</option>
                            <option>Not sure yet</option>
                        </select>
                    </div>

                    <!-- How did you hear -->
                    <div>
                        <label for="referral" class="block font-medium text-sm text-gray-700">How did you hear about us?
                            <span class="text-red-500">*</span></label>
                        <input id="referral" v-model="formData.referral" type="text"
                            placeholder="Search engine, social media, colleague, etc." required
                            class="mt-1 w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <!-- Error message -->
                    <div v-if="status.error" class="text-red-600 text-sm">{{ status.message }}</div>

                    <!-- Submit -->
                    <CustomButton type="submit" :disabled="status.submitting" class="w-full">
                        {{ status.submitting ? 'Submitting...' : 'Request Demo' }}
                    </CustomButton>

                    <p class="text-xs text-center text-gray-500 mt-4">
                        By submitting this form, you agree to our <a href="/privacy-policy" class="underline hover:text-primary-purple">Privacy
                            Policy</a>.
                    </p>
                </form>
            </template>
        </div>
    </div>
</template>