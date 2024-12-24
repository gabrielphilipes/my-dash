<template>
  <div class="p-4">
    <UCard class="max-w-md mx-auto">
      <template #header>
        <h3 class="text-lg font-semibold">Demonstração do Pinia Store</h3>
      </template>

      <div class="space-y-4">
        <p>Contagem atual: {{ counter.count }}</p>
        <p>Contagem dobrada: {{ counter.doubleCount }}</p>

        <div class="flex gap-2">
          <UButton @click="counter.increment()"> Incrementar </UButton>

          <UButton @click="counter.decrement()" variant="outline">
            Decrementar
          </UButton>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const counter = useCounterStore();
</script>
