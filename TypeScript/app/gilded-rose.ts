export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    // Constants
    const MAX_QUALITY = 50;
    const BACKSTAGE_PASS_10_DAYS = 11;
    const BACKSTAGE_PASS_5_DAYS = 6;
  
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
  
      // Legendary item Sulfuras is never altered
      if (item.name !== "Sulfuras, Hand of Ragnaros") {
        // Decrease sellIn for all items
        item.sellIn -= 1;
  
        // Handle Aged Brie
        if (item.name === "Aged Brie") {
          if (item.quality < MAX_QUALITY) {
            // Aged Brie increases in quality over time
            item.quality += 1;
          }
        } 
        // Handle Backstage Passes
        else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
          if (item.quality < MAX_QUALITY) {
            // Increase quality as concert date approaches
            item.quality += 1;
  
            if (item.sellIn < BACKSTAGE_PASS_10_DAYS) {
              // Quality increases by 2 when 10 days or less
              if (item.quality < MAX_QUALITY) {
                item.quality += 1;
              }
            }
  
            if (item.sellIn < BACKSTAGE_PASS_5_DAYS) {
              // Quality increases by 3 when 5 days or less
              if (item.quality < MAX_QUALITY) {
                item.quality += 1;
              }
            }
  
            if (item.sellIn < 0) {
              // Quality drops to 0 after the concert
              item.quality = 0;
            }
          }
        } 
        // Handle Conjured items
        else if (item.name === "Conjured Mana Cake") {
          // Conjured items degrade twice as fast
          item.quality -= 2;
        } 
        // Handle other items
        else {
          if (item.quality > 0) {
            // Normal items degrade in quality
            item.quality -= 1;
          }
        }
  
        if (item.sellIn < 0) {
          // Quality degrades faster after the sell by date for normal items
          if (
            item.name !== "Aged Brie" &&
            item.name !== "Backstage passes to a TAFKAL80ETC concert"
          ) {
            if (item.quality > 0 && item.name !== "Sulfuras, Hand of Ragnaros") {
              if (item.name === "Conjured Mana Cake") {
                // Handle Conjured items after the sell by date
                item.quality -= 2;
              } else {
                // Handle other items after the sell by date
                item.quality -= 1;
              }
            }
          }
        }
      }
    }
  
    return this.items;
  }
  
  
}
