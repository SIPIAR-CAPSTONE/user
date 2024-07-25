import { useEffect } from "react";
import useBoundStore from '../zustand/useBoundStore'
import * as FileSystem from 'expo-file-system'

/* 
* Custom image reader. From string convert to encrypted base 64 image format
*
*/
const useImageReader = (setImageUri) => {
  const globalStateProfilePath = useBoundStore(
    (state) => state.profilePicturePath,
  )

  useEffect(() => {
    const fetchImage = async () => {
      if (globalStateProfilePath) {
        const imageBase64 = await FileSystem.readAsStringAsync(
          globalStateProfilePath,
          {
            encoding: FileSystem.EncodingType.Base64,
          },
        )
        setImageUri(`data:image/*;base64,${imageBase64}`)
      }
    }

    fetchImage()
  }, [globalStateProfilePath])
}

export default useImageReader
