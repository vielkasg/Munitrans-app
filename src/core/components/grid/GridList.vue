<template>
  <ion-grid>
    <ion-row>
      <ion-col
        :size="String(12 / (props.itemsPerRow || 3))"
        v-for="(item, index) in items"
        :key="getItemKey(item, index)"
      >
        <slot name="grid-item" :item="item">
          <grid-item :title="getTitle(item)">
            <template
              v-for="(field, fieldIndex) in contentFields"
              :key="fieldIndex"
            >
              <p>
                <span class="app-card-subtitle">{{ field.label }}: </span>
                <span
                  class="app-card-content truncate-text"
                  :style="{ color: field.color }"
                  >{{ getContent(item, field.field) }}</span
                >
              </p>
            </template>
            <ion-badge v-if="itemBadge" slot="end">{{
              itemBadge?.textByValue?.[item[itemBadge.field || ""]]
            }}</ion-badge>
            <slot name="actions" :item="item"></slot>
          </grid-item>
        </slot>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script setup lang="ts">
import { IonGrid, IonRow, IonCol } from "@ionic/vue";
import GridItem from "./GridItem.vue";

interface Props {
  items: any[];
  titleField: string;
  contentFields: { label?: string; field: string; color?: string }[];
  itemsPerRow?: number;
  keyField?: string;
  itemBadge?: {
    color?: string;
    textByValue?: Record<string, unknown>;
    field?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerRow: 3,
  keyField: "",
});

const getItemKey = (item: any, index: number) => {
  return props.keyField ? item[props.keyField] : index;
};

const getTitle = (item: any) => {
  return item[props.titleField];
};

const getContent = (item: any, field: string) => {
  return item[field] || "N/A";
};
</script>
