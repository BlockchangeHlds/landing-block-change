<script setup lang="ts">
const columns = [{
  label: 'Resources',
  children: [{
    label: 'Help center'
  }, {
    label: 'Docs'
  }, {
    label: 'Roadmap'
  }, {
    label: 'Changelog'
  }]
}, {
  label: 'Features',
  children: [{
    label: 'Affiliates'
  }, {
    label: 'Portal'
  }, {
    label: 'Jobs'
  }, {
    label: 'Sponsors'
  }]
}, {
  label: 'Company',
  children: [{
    label: 'About'
  }, {
    label: 'Pricing'
  }, {
    label: 'Careers'
  }, {
    label: 'Blog'
  }]
}]

const toast = useToast()

const email = ref('')
const loading = ref(false)

function onSubmit() {
  loading.value = true

  toast.add({
    title: 'Subscribed!',
    description: 'You\'ve been subscribed to our newsletter.'
  })
}
</script>

<template>
  <!--  <USeparator
    icon="i-simple-icons-nuxtdotjs"
    class="h-px"
  /> -->

  <UFooter :ui="{ top: 'border-b border-default' }">
    <!-- <template #top>
      <UContainer>
        <UFooterColumns :columns="columns">
          <template #right>
            <form @submit.prevent="onSubmit">
              <UFormField
                name="email"
                label="Subscribe to our newsletter"
                size="lg"
              >
                <UInput
                  v-model="email"
                  type="email"
                  class="w-full"
                  placeholder="Enter your email"
                >
                  <template #trailing>
                    <UButton
                      type="submit"
                      size="xs"
                      label="Subscribe"
                    />
                  </template>
                </UInput>
              </UFormField>
            </form>
          </template>
        </UFooterColumns>
      </UContainer>
    </template> -->

    <template #left>
      <p class="text-sm text-muted">
        Block Change • © {{ new Date().getFullYear() }}
      </p>
    </template>

    <template #right>
      <UButton
        to="https://go.nuxt.com/x"
        target="_blank"
        icon="i-simple-icons-instagram"
        aria-label="Instagram"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://www.linkedin.com/company/blockchange-holdings"
        target="_blank"
        icon="i-simple-icons-linkedin"
        aria-label="Block Change on LinkedIn"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://forms.gle/9subanERq885CMNNA"
        target="_blank"
        icon="i-heroicons-book-open"
        aria-label="Libro de Reclamaciones"
        color="neutral"
        variant="ghost"
      >
        Libro de Reclamaciones
      </UButton>
      <UButton
        to="https://docs.google.com/document/d/1-kxevaevUwc4pbM2-EQpBxKDPL2iVkH1r8nq12cllyE/edit?tab=t.0"
        target="_blank"
        icon="i-heroicons-book-open"
        aria-label="Libro de Reclamaciones"
        color="neutral"
        variant="ghost"
      >
        F.A.Qs
      </UButton>
    </template>
  </UFooter>
</template>
