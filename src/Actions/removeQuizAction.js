import { AsyncStorage } from 'react-native';

export function removeQuizFromHistory(data) {
    // console.log(data)
    return dispatch => {
        // console.log("IN ACTION");
        AsyncStorage.getItem('@LocalUser:inprogressData', (err, snap) => {
            var arr = JSON.parse(snap);
            // console.log(arr)
            if (arr !== null) {
                if (Array.isArray(arr)) {
                    var flaqExist = false;
                    var index;
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].quiz.name.titles === data.name.titles) {
                            flaqExist = true;
                            index = i;
                        }
                    }
                    if (flaqExist) {
                        arr.splice(index, 1)
                        AsyncStorage.setItem('@LocalUser:inprogressData', JSON.stringify(arr))
                    }
                }
            }
        })
    };

}