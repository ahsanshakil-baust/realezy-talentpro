import React, { useState } from 'react'
// import Image from 'next/image'
import { FaTrash } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import ConditionUpload from './ConditionUpload'
import { Button } from '@mui/material'
const Condition = ({ addNewValue, handleFormSubmit, condition, title, fileName, isSpinner }: any) => {
  const [showConditionModal, setShowConditionModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const handleRemoveImage = (e: any) => {
    let prev = condition.data.propertyConditionReportList[fileName]
    prev = prev.filter((_: any, index: any) => index !== parseInt(e.currentTarget.id))
    condition.data.propertyConditionReportList[fileName] = prev
    // console.log('after deleting -------', condition)
    addNewValue(condition)
  }
  return (
    <div id={title} className="p-2 mx-1 mb-3 border rounded">
      <div className="occupier-title">
        <h4 style={{ textAlign: 'left' }}>{title}</h4>
      </div>
      <hr style={{ height: '2px', borderWidth: '0', color: 'blac', backgroundColor: 'black' }} />
      <div className="d-flex justify-content-center condition-upload-img-cont">
        <Button
          style={{
            padding: '0',
            border: 'none',
            background: 'none',
            width: '100%',
            display: 'block',
          }}
          // name={fileName}
          {...register(fileName)}
          onClick={() => setShowConditionModal(true)}>
          {/* <Image src={uploadicon} alt="Upload" width={25} height={25} /> */}
          {/* <br /> */}
          <p style={{ color: 'black' }}>Condition (Image)</p>
        </Button>
      </div>
      <div className="flex justify-content-center">
        {condition?.data?.propertyConditionReportList[fileName].length > 0 &&
          condition?.data?.propertyConditionReportList[fileName].map((item: any, index: any) => (
            <div key={index}>
              <div className="px-2 my-2 py-2 condition-upload-img-cont">
                <div style={{ padding: '3px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '15px' }}>{`${item?.image_name} (${item?.uploader_role} Uploaded)`}</span>
                  <span id={index} onClick={handleRemoveImage}>
                    <FaTrash />
                  </span>
                </div>
                <div style={{ padding: '3px' }}>
                  {typeof item?.image === 'string' &&
                    (item?.image.includes('jpg') || item?.image.includes('jpeg') || item?.image.includes('png')) && (
                      <img id={index} style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }} src={item?.image} alt="" />
                    )}
                  {typeof item?.image === 'string' &&
                    (item?.image.includes('mkv') || item?.image.includes('mov') || item?.image.includes('mp4')) && (
                      <video
                        id={index}
                        autoPlay
                        muted
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        src={item?.image}></video>
                    )}
                  {item?.image && typeof item?.image !== 'string' && (item?.image?.type ? item.image.type : "").includes('image') && (
                    <img id={index} style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }} src={URL.createObjectURL(item?.image)} alt="" />
                  )}
                  {item?.image && typeof item?.image !== 'string' && (item?.image?.type ? item.image.type : "").includes('video') && (
                    <video
                      id={index}
                      autoPlay
                      muted
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      src={URL.createObjectURL(item?.image)}></video>
                  )}
                </div>
                <div style={{ padding: '3px' }}>
                  <span>Condition while</span>
                  <span>{item?.move_in !== '' ? ' move in ' + item?.move_in : ' move out ' + item?.move_out}</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <ConditionUpload
        handleFormSubmit={handleFormSubmit}
        errors={errors}
        isSpinner={isSpinner}
        register={register}
        handleSubmit={handleSubmit}
        showConditionModal={showConditionModal}
        setShowConditionModal={setShowConditionModal}
        fileName={fileName}
      />
    </div>
  )
}
export default Condition
