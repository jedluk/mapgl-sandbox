import React, { Fragment, useState } from 'react'
import { useBoolean } from 'use-boolean'

import { Button } from './components/button/Button'
import { Modal } from './components/modal/Modal'
import { Map } from './pages/root/Map'
import { SelectMap } from './SelectMap'

export function App() {
  const [isModalVisible, , closeModal] = useBoolean(true)
  const [mapStyle, setMapStyle] = useState<
    'liberty' | 'postitron' | 'darkMatter'
  >('liberty')

  return (
    <Fragment>
      <Modal
        title="Select map style"
        visible={isModalVisible}
        onClose={closeModal}
        actions={<Button text="Confirm" onClick={closeModal} />}
      >
        <SelectMap mapStyle={mapStyle} onChangeMapStyle={setMapStyle} />
      </Modal>
      <Map />
    </Fragment>
  )
}
