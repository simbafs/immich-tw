import fs from 'node:fs/promises'

const dir_path = '/usr/src/app/server/node_modules/i18n-iso-countries/langs'

const locales = await fs.readdir(dir_path)

const mapping = {
  "Republikken Kina Taiwan": "Taiwan",
  "Taiwan, Cúige na Síne": "Taiwan",
  "Taiwan, Province of China": "Taiwan",
  "Taiwan, Talaith China": "Taiwan",
  "Тайвань, Провінція Китаю": "Тайвань",
  "তাইওয়ান, চীনের প্রদেশ": "তাইওয়ান",
  "中国台湾省": "台湾",
  "Тайвань,Китайская Республика": "Тайвань",
}

await Promise.all(locales.map(async (locale) => {
  const content = await fs.readFile(`${dir_path}/${locale}`, 'utf-8')
  const json = JSON.parse(content)
  const country_name = json.countries['TW']
  let new_name
  let is_updated = false
  if (Array.isArray(country_name)) {
    const name_set = new Set()
    for (const name of country_name) {
      if (mapping[name]) {
        name_set.add(mapping[name])
        is_updated = true
      } else {
        name_set.add(name)
      }
    }
    if (name_set.size > 1) {
      new_name = Array.from(name_set)
    } else {
      new_name = name_set.values().next().value
    }
  } else {
    if (mapping[country_name]) {
      new_name = mapping[country_name]
      is_updated = true
    } else {
      new_name = country_name
    }
  }
  if (is_updated) {
    console.log(`Update ${locale} from ${country_name} to ${new_name}`)
    json.countries['TW'] = new_name
    await fs.writeFile(`${dir_path}/${locale}`, JSON.stringify(json, null, 2), 'utf-8')
    console.log(`Update ${locale} to ${new_name}`)
  }
}))

console.log('Done')
