(function supercriticalchamberRecipes() {
  const { BUCKET, GEM_BLOCK, SLIMEBALL, INGOT, GEM, NUGGET, mB } = global.fluids;

  onEvent("recipes", (event) => {
    const standardSupercriticalchamberStructure = /** @type {const} */ ([
      ["gcg", "ccc", "gcg", " m "], //bottom
      ["cfc", "f f", "cfc", "   "],
      ["glg", "l l", "glg", "   "],
      ["cfc", "f f", "cfc", "   "],
      ["gcg", "ccc", "gcg", "   "], //top
    ]);
    const supercriticalchamberStructure = /** @type {const} */ ([standardSupercriticalchamberStructure]);
    const supercriticalchamberRecipes = [
      {
        time: 20,
        fluidInput: { fluid: "techreborn:nitrogen", amount: 100 * mB },
        itemInput: { item: "createastral:hydrogel", count: 1 },
        energy: 2500,
        itemOutput: { item: "createastral:aerogel", count: 1 },
      },
      {
        // This recipe is correctly funtioning by using a cell for the itemInput without it being present.
        // For some reason it doesnt actually require the cell, probably me doing the item data wrong -Sheep
        time: 20,
        fluidInput: { fluid: "kubejs:carbon_dioxide", amount: 500 * mB },
        itemInput: { item: "techreborn:cell{fluid:kubejs:carbon_dioxide}", count: 1 },
        energy: 5000,
        itemOutput: { item: "createastral:dry_ice", count: 1 },
      },
    ];
    supercriticalchamberRecipes.forEach((recipe) => {
      for (const supercriticalchamber of supercriticalchamberStructure) {
        event.custom({
          type: "custommachinery:custom_machine",
          machine: "createastral:supercritical_chamber",
          time: recipe.time,
          requirements: [
            {
              type: "custommachinery:structure",
              keys: {
                g: "create:metal_girder",
                l: "techreborn:reinforced_glass",
                c: "techreborn:advanced_machine_casing",
                f: "techreborn:advanced_machine_frame"
              },
              pattern: supercriticalchamber,
            },
            {
              type: "custommachinery:item",
              item: recipe.itemInput.item,
              amount: recipe.itemInput.count,
              mode: "input",
            },
            {
              type: "custommachinery:item",
              item: recipe.itemOutput.item,
              amount: recipe.itemOutput.count,
              mode: "output",
            },
            {
              type: "custommachinery:fluid",
              fluid: recipe.fluidInput.fluid,
              amount: recipe.fluidInput.amount,
              mode: "input",
            },
            {
              type: "custommachinery:energy",
              mode: "input",
              amount: recipe.energy,
            },
          ]
        });
      }
    });
  });
})();
