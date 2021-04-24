const SEPERATOR = ' '

export function parseWithKeywords(keywords, expression, params) {
  const keyword = Object.keys(keywords).find(k => expression.startsWith(k + SEPERATOR))
  if (keyword) {
  	let restOfExpression = expression.replace(keyword + SEPERATOR, '')
  	if (restOfExpression.includes(SEPERATOR)) {
  		restOfExpression = restOfExpression.split(SEPERATOR)
  	}
  	return keywords[keyword](restOfExpression, params)
  } else if (params) {
  	return { [expression]: params }
  } else {
  	return expression
  }
}