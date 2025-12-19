/**
 * Card System - Card drawing, selection, application
 * TODO: Implement card system from CARDS.md
 */

import { Card, CardDrawState } from '../types/card'

export class CardSystem {
  /**
   * Draw random cards based on current pool and state
   * TODO: Implement card drawing logic
   */
  static drawCards(state: CardDrawState, availablePool: Card[]): Card[] {
    // TODO: Implement:
    // 1. Filter cards by prerequisites
    // 2. Filter by minimum wave
    // 3. Remove already unlocked tower unlocks
    // 4. Weight by rarity
    // 5. Select random cards (cardsPerDraw count)

    console.log('TODO: Draw cards')
    return []
  }

  /**
   * Apply card effect to game state
   * TODO: Implement card application logic
   */
  static applyCard(card: Card, gameState: any): void {
    // TODO: Implement:
    // 1. Check card type
    // 2. Apply effect based on target:
    //    - specific_tower: Apply to single tower
    //    - tower_type: Apply to all towers of type
    //    - all_towers: Apply to all towers
    //    - global: Apply global buff
    // 3. Track unlocked cards
    // 4. Add upgrade cards to pool if unlock

    console.log('TODO: Apply card', card.id)
  }

  /**
   * Check if card can be drawn (prerequisites met)
   */
  static canDrawCard(card: Card, unlockedCards: string[], currentWave: number): boolean {
    // Check prerequisites
    if (card.prerequisiteCards) {
      const hasPrereqs = card.prerequisiteCards.every((prereq) =>
        unlockedCards.includes(prereq)
      )
      if (!hasPrereqs) return false
    }

    // Check minimum wave
    if (card.minWave && currentWave < card.minWave) {
      return false
    }

    return true
  }

  /**
   * Calculate when next card draw should occur
   */
  static calculateNextDrawWave(currentWave: number, frequency: number): number {
    return Math.ceil((currentWave + 1) / frequency) * frequency
  }
}
