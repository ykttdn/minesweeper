<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps(["score"]);
</script>

<template>
    <div class="p-6 flex space-x-2">
        <div class="flex-1">
            <div class="flex justify-between items-center">
                <div>
                    <span class="text-gray-800">{{ score.user.name }}</span>
                    <small class="ml-2 text-sm text-gray-600">{{
                        new Date(score.created_at).toLocaleString()
                    }}</small>
                </div>
            </div>
            <p class="mt-4 text-lg text-gray-900">{{ score.level }}</p>
            <p class="mt-4 text-lg text-gray-900">{{ score.time }}</p>
        </div>
    </div>
</template>
