function sorter(sortBy) {
  switch (sortBy) {
    case 'asc': {
      return { name_en: 'asc' }
    }

    case 'desc': {
      return { name_en: 'desc' }
    }

    case 'bycategory': {
      return 'category : 1'
    }

    case 'byarea': {
      return 'location : 1'
    }
  }
}

module.exports = sorter