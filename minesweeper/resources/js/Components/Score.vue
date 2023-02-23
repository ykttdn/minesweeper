<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps(["score", "showsLevel", "ranking"]);
const medalImages = [
    { class: "", alt: "" },
    { class: "gold-medal", alt: "1st place" },
    { class: "silver-medal", alt: "2nd place" },
    { class: "bronze-medal", alt: "3rd place" },
];
</script>

<template>
    <div class="p-6 flex space-x-2">
        <div v-if="ranking > 0" class="pt-4">
            <div
                :class="medalImages[ranking].class"
                :aria-label="medalImages[ranking].alt"
                role="img"
            ></div>
        </div>
        <div class="flex-1">
            <div class="flex justify-between items-center">
                <div>
                    <span class="text-gray-800">{{ score.user.name }}</span>
                    <small class="ml-2 text-sm text-gray-600">{{
                        new Date(score.created_at).toLocaleString()
                    }}</small>
                </div>
            </div>
            <p v-if="showsLevel" class="mt-4 text-lg text-gray-900">
                {{ score.level.toUpperCase() }}
            </p>
            <p class="mt-4 text-lg text-gray-900">{{ score.time }} sec</p>
        </div>
    </div>
</template>
