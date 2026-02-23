import type { Language, Slot } from '@/types';

export type SlotProps = {
  /**
   * The array of the languages containing language and slot information.
   */
  languages: Array<{
    /**
     * The structure of the language.
     */
    language: Pick<Language, 'id' | 'name'>;
    /**
     * Array of slots.
     */
    slots: Array<Pick<Slot, 'id' | 'price' | 'startTime'>>;
  }>;
};
