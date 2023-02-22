export function BuildFile(ingredientFirst, ingredientSecond, result, craftClass, m_Name, m_IsInstaRecipe, m_AnimationLength) {
    const file = `class ${craftClass} extends RecipeBase\r
{\r
\toverride void Init()\r
\t{\r
\t\tm_Name = "${m_Name}";\r
\t\tm_IsInstaRecipe = ${m_IsInstaRecipe};                         // should this recipe be performed instantly without animation\r
\t\tm_AnimationLength = ${m_AnimationLength};                           // animation length in relative time units\r
\t\tm_Specialty = 0;                                 // value > 0 for roughness, value < 0 for precision\r
\t\t\r
\t\t//ingredient 1\r
\t\t${ingredientFirst?.classnames.map((classname, index, classnames) => `InsertIngredient(0,"${classname}");${index < (classnames.length - 1) ? '\n' : ''}`).join('\t\t')}
\t\t\r
\t\tm_MinDamageIngredient[0] = ${ingredientFirst?.m_MinDamageIngredient};                   // -1 = disable check\r
\t\tm_MaxDamageIngredient[0] = ${ingredientFirst?.m_MaxDamageIngredient};                   // -1 = disable check\r
\t\t\r
\t\tm_MinQuantityIngredient[0] = ${ingredientFirst?.m_MinQuantityIngredient};                 // -1 = disable check\r
\t\tm_MaxQuantityIngredient[0] = ${ingredientFirst?.m_MaxQuantityIngredient};                 // -1 = disable check\r
\t\t\r
\t\tm_IngredientAddHealth[0] = ${ingredientFirst?.m_IngredientAddHealth};                    // 0 = do nothing\r
\t\tm_IngredientSetHealth[0] = ${ingredientFirst?.m_IngredientSetHealth};                   // -1 = do nothing\r
\t\tm_IngredientAddQuantity[0] = ${ingredientFirst?.m_IngredientAddQuantity};                  // 0 = do nothing\r
\t\tm_IngredientDestroy[0] = ${ingredientFirst?.m_IngredientDestroy};                   // true = destroy, false = do nothing\r
\t\tm_IngredientUseSoftSkills[0] = ${ingredientFirst?.m_IngredientUseSoftSkills};            // set 'true' to allow modification of the values by softskills on this ingredient\r
\t\t\r
\t\t//ingredient 2\r
\t\t// you can insert multiple ingredients this way\r
\t\t${ingredientSecond?.classnames.map((classname, index, classnames) => `InsertIngredient(1,"${classname}");${index < (classnames.length - 1) ? '\n' : ''}`).join('\t\t')}
\t\t\r
\t\tm_MinDamageIngredient[1] = ${ingredientSecond?.m_MinDamageIngredient};                   // -1 = disable check\r
\t\tm_MaxDamageIngredient[1] = ${ingredientSecond?.m_MaxDamageIngredient};                   // -1 = disable check\r
\t\t\r
\t\tm_MinQuantityIngredient[1] = ${ingredientSecond?.m_MinQuantityIngredient};                 // -1 = disable check\r
\t\tm_MaxQuantityIngredient[1] = ${ingredientSecond?.m_MaxQuantityIngredient};                 // -1 = disable check\r
\t\t\r
\t\tm_IngredientAddHealth[1] = ${ingredientSecond?.m_IngredientAddHealth};                    // 0 = do nothing\r
\t\tm_IngredientSetHealth[1] = ${ingredientSecond?.m_IngredientSetHealth};                   // -1 = do nothing\r
\t\tm_IngredientAddQuantity[1] = ${ingredientSecond?.m_IngredientAddQuantity};                  // 0 = do nothing\r
\t\tm_IngredientDestroy[1] = ${ingredientSecond?.m_IngredientDestroy};                   // false = do nothing\r
\t\tm_IngredientUseSoftSkills[1] = ${ingredientSecond?.m_IngredientUseSoftSkills};            // set 'true' to allow modification of the values by softskills on this ingredient\r
\t\t\r
\t\t//result 1\r
\t\tAddResult("${result?.classname}");                    // add results here\r
\t\t\r
\t\tm_ResultSetFullQuantity[0] = ${result?.m_ResultSetFullQuantity};               // true = set full quantity, false = do nothing\r
\t\tm_ResultSetQuantity[0] = ${result?.m_ResultSetQuantity};                     // -1 = do nothing\r
\t\tm_ResultSetHealth[0] = ${result?.m_ResultSetHealth};                       // -1 = do nothing\r
\t\tm_ResultInheritsHealth[0] = ${result?.m_ResultInheritsHealth};                  // (value) == -1 means do nothing; a (value) >= 0 means this result will inherit health from ingredient number (value);(value) == -2 means this result will inherit health from all ingredients averaged(result_health = combined_health_of_ingredients / number_of_ingredients)\r
\t\tm_ResultInheritsColor[0] = ${result?.m_ResultInheritsColor};                   // (value) == -1 means do nothing; a (value) >= 0 means this result classname will be a composite of the name provided in AddResult method and config value "color" of ingredient (value)\r
\t\tm_ResultToInventory[0] = ${result?.m_ResultToInventory};                     // (value) == -2 spawn result on the ground;(value) == -1 place anywhere in the players inventory, (value) >= 0 means switch position with ingredient number(value)\r
\t\tm_ResultUseSoftSkills[0] = ${result?.m_ResultUseSoftSkills};                 // set 'true' to allow modification of the values by softskills on this result\r
\t\tm_ResultReplacesIngredient[0] = ${result?.m_ResultReplacesIngredient};              // value == -1 means do nothing; a value >= 0 means this result will transfer item propertiesvariables, attachments etc.. from an ingredient value\r
\t}\r
\t\r
\t//final check for recipe's validity\r
\toverride bool CanDo(ItemBase ingredients[], PlayerBase player)\r
\t{\r
\t    return true;\r
\t}\r
};`;

    return file;
}
