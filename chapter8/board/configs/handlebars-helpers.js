module.exports = {
    // 리스트 길이 반환
    lengthOfList: (list = []) => list.length,
    // 두 값을 비교해 같은지 여부를 반환
    eq: (val1, val2) => val1 === val2,
    // ISO 문자열에서 날짜만 반환
    dateString: (isoString) => new Date(isoString).toLocaleDateString(),
}