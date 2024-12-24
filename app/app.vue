<template>
  <div class="p-4 space-y-8">
    <!-- Card do contador -->
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

    <!-- Card com exemplos do VueUse -->
    <UCard class="max-w-md mx-auto">
      <template #header>
        <h3 class="text-lg font-semibold">Demonstração do VueUse</h3>
      </template>

      <div class="space-y-4">
        <!-- Mouse -->
        <div class="p-4 border rounded-lg">
          <p>Posição do Mouse: x: {{ x }}, y: {{ y }}</p>
          <p>Mouse pressionado: {{ pressed ? "Sim" : "Não" }}</p>
        </div>

        <!-- Bateria -->
        <div class="p-4 border rounded-lg">
          <p>Nível da Bateria: {{ Math.round(batteryLevel * 100) }}%</p>
          <p>Carregando: {{ charging ? "Sim" : "Não" }}</p>
        </div>

        <!-- Rede -->
        <div class="p-4 border rounded-lg">
          <p>Online: {{ isOnline ? "Sim" : "Não" }}</p>
        </div>

        <!-- Tema -->
        <div class="flex items-center justify-between p-4 border rounded-lg">
          <span>Tema Escuro</span>
          <UToggle v-model="isDark" />
        </div>
      </div>
    </UCard>

    <UCard class="max-w-md mx-auto">
      <template #header>
        <h3 class="text-lg font-semibold">Demonstração do NuxtHub</h3>
      </template>

      <div class="space-y-4">
        <UButton @click="checkPing" :loading="loading"> Ping </UButton>
        <div v-if="response" class="mt-2">
          <p>Mensagem: {{ response.message }}</p>
          <p>Timestamp: {{ response.timestamp }}</p>
          <p class="text-sm text-gray-600">
            Requisições restantes: {{ response.rateLimit.remaining }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import {
  useMouse,
  useMousePressed,
  useBattery,
  useNetwork,
  useDark,
} from "@vueuse/core";

const counter = useCounterStore();

// Mouse
const { x, y } = useMouse();
const { pressed } = useMousePressed();

// Bateria
const { charging, level: batteryLevel } = useBattery();

// Rede
const { isOnline } = useNetwork();

// Tema escuro
const isDark = useDark();

// API
const loading = ref(false);
const response = ref<{
  message: string;
  timestamp: string;
  rateLimit: { remaining: any; resetIn: any };
} | null>(null);

async function checkPing() {
  loading.value = true;
  try {
    const result = await $fetch("/api/ping");
    response.value = result;
  } catch (error) {
    console.error("Erro ao fazer ping:", error);
  } finally {
    loading.value = false;
  }
}
</script>
