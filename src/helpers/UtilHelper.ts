export const calculateYearsOld = (birthdate: Date) => {
    let timeDiff = Math.abs(Date.now() - birthdate.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
}

export const fnGroupDataByKey = (data, key) => {
    return data.reduce((acc, item) => {
      const group = item[key]
      if (!acc[group]) {
        acc[group] = []
      }
      acc[group].push(item)
      return acc
    }, {})
  }