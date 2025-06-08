<template>
  <UButton
    type="button"
    variant="link"
    leading-icon="devicon:google"
    label="Google"
    class="!text-neutral-600 hover:text-neutral-600 hover:bg-neutral-100"
    :disabled="true"
  />

  <UButton
    type="button"
    variant="link"
    leading-icon="i-mdi-facebook"
    label="Facebook"
    class="!text-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/10"
    :disabled="true"
  />

  <a href="/oauth/github">
    <UButton
      type="button"
      variant="link"
      leading-icon="i-mdi-github"
      label="GitHub"
      class="!text-black hover:text-black hover:bg-black/5"
    />
  </a>
</template>
