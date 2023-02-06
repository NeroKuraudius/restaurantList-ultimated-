function selected(value) {
  switch (value) {
    case 'asc': {
      return { 'asc': true }
    }

    case 'desc': {
      return { 'desc': true }
    }

    case 'bycategory': {
      return { 'bycategory': true }
    }

    case 'byarea': {
      return { 'byarea': true }
    }
  }
}

module.exports = selected