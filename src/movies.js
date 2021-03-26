// Iteration 1: All directors? - Get the array of all directors.

const getAllDirectors = (movies)=>{
  return movies.map((movie) => movie.director )
}

// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

// const listOfUnrepeatedDirectors = arrayOfDirectors.filter((director, index, self)=>{
//   return index === self.indexOf(director)
// })

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

const howManyMovies = (movies)=>{
  const speilbergMovies = movies.filter((movie)=>{
    return (movie.director === 'Steven Spielberg' && movie.genre.includes('Drama'))
  })
  return speilbergMovies.length
}

// Iteration 3: All rates average - Get the average of all rates with 2 decimals

const ratesAverage = (movies)=>{
  if(movies.length === 0) return 0
  const sumOfRates = movies.reduce((acc, movie)=>{
    if(movie.rate){
      return acc + movie.rate
    } else {
      return acc
    }
  }, 0)
  // return Math.round((sumOfRates / movies.length) * 100) / 100;
  return Number((sumOfRates/movies.length).toFixed(2))
}

// Iteration 4: Drama movies - Get the average of Drama Movies

const dramaMoviesRate = (movies)=>{
  const listOfDramaMovies = movies.filter((movie)=>{
    return movie.genre.includes('Drama')
  })
  return ratesAverage(listOfDramaMovies)
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

const sortAlfabetically = (movies)=>{
  return movies.sort((a, b)=>{
    if(a.title <= b.title) return -1
    if(a.title > b.title) return 1
    return 0
  })
}

const orderByYear = (movies)=>{
  const copyOfMovies = [...movies]
  // const copyOfMovies = movies.map((movie)=>movie)

  const orderedAlphabeticallyByTitle = sortAlfabetically(copyOfMovies)

 const answer = orderedAlphabeticallyByTitle.sort((a, b)=>{
   return a.year - b.year
 })

 return answer
  
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

const orderAlphabetically = (movies)=>{
  const copyOfMovies = [...movies]

  const alfabeticallyOrderedMovies = sortAlfabetically(copyOfMovies)

  const first20AlfabeticallyOrderedMovies = alfabeticallyOrderedMovies.filter((movie, index)=>{
    return index < 20
  })

  const listOfTitles = first20AlfabeticallyOrderedMovies.map((movie)=> movie.title)

  return listOfTitles
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

const formatTime = (duration)=>{
  try {
    if(duration.includes('h') && duration.includes('min')){
      const hoursAndMinutesDivided = duration.split(' ')
      return formatTime(hoursAndMinutesDivided[0]) + formatTime(hoursAndMinutesDivided[1])
    } else if(duration.includes('h')){
        return Number(duration.slice(0, duration.length - 1)) * 60
    } else {
      return Number(duration.slice(0, duration.length - 3))
    }
  } catch {
    return 0
  }
}


const turnHoursToMinutes = (movies)=>{

  return movies.map((movie)=>{

    const newMovie = {
      ...movie, 
      duration: formatTime(movie.duration)
    }

    return newMovie
  })
}

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average


const bestYearAvg = (movies) =>{

  if(movies.length === 0) return null
  
  const separatedByYears = {}
  let highestAverage = 0
  let bestYear = 0
  
  movies.forEach((movie)=>{
    if(!separatedByYears[movie.year]){
      separatedByYears[movie.year] = [movie]
    } else {
      separatedByYears[movie.year].push(movie)
    }
  })
  
  
  for(let key in separatedByYears){
  
  const average = ratesAverage(separatedByYears[key])
    if(average > highestAverage){
      highestAverage = average
      bestYear = key
    }
  }

  return `The best year was ${bestYear} with an average rate of ${highestAverage}`
}

