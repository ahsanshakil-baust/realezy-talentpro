import { Button } from '@mui/material'
import React, { useState } from 'react'

const ConditionFileUpload = (props: any) => {
  const { handleFormSubmit, fileName, setShowConditionModal, register, handleSubmit, isSpinner, errors } = props

  return (
    <>
      <form
        onSubmit={handleSubmit((data: any) => {
          setShowConditionModal(false)
          handleFormSubmit(data)
        })}>
        <div>
          <div>
            <h5 className="occupier-title">Select Condition For</h5>
            <select className="form-control cstm-select" name="conditionArea" {...register('image_name')} id="">
              <option selected value="">
                Choose an option
              </option>
              <option value="Living area">Living area</option>
              <option value="Dining area">Dining area</option>
              <option value="Master bedroom">Master bedroom</option>
              <option value="bedroom #02">bedroom #02</option>
              <option value="bedroom #03">bedroom #03</option>
              <option value="Attached bathroom">Attached bathroom</option>
              <option value="Common toilet">Common toilet</option>
              <option value="Kitchen">Kitchen</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <div className="mb-2">
            {/* <div className="schdl-meeting-place-radio-wrapper"> */}
            <div className="p-0">
              <input type="radio" id="houseviewing" name="move_in" value="Move In" {...register('move')} />
              <label htmlFor="houseviewing" className="option at-property">
                <div className="dot" />
                <span>Move In</span>
              </label>
            </div>
            <div className="p-0">
              <input type="radio" id="signing" value="Move Out" name="move_out" {...register('move')} />
              <label htmlFor="signing" className="option other-location">
                <div className="dot" />
                <span>Move Out</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <div>
            <h5 className="occupier-title">Select Condition</h5>

            {fileName == 'condition_of_floor' && (
              <select
                className="form-control cstm-select"
                name="condition_of_floor"
                {...register('condition_of_floor')}
                id="">
                <option selected value="">
                  Choose an option
                </option>
                <option value="no defect">no defect</option>
                <option value="brand new">brand new</option>
                <option value="pristine">pristine</option>
                <option value="stains">stains</option>
                <option value="burns">burns</option>
                <option value="holes">holes</option>
                <option value="snags">snags</option>
                <option value="worn">worn</option>
              </select>
            )}

            {fileName == 'condition_of_walls' && (
              <select
                className="form-control cstm-select"
                name="condition_of_walls"
                {...register('condition_of_walls')}
                id="">
                <option selected value="">
                  Choose an option
                </option>
                <option value="no defect">no defect</option>
                <option value="brand new">brand new</option>
                <option value="pristine">pristine</option>
                <option value="holes">holes</option>
                <option value="marks">marks</option>
                <option value="stains">stains</option>
                <option value="hooks">hooks</option>
                <option value="nails">nails</option>
              </select>
            )}
            {fileName == 'appliances' && (
              <select className="form-control cstm-select" name="appliances" {...register('appliances')} id="">
                <option selected value="">
                  Choose an option
                </option>
                <option value="no defect">no defect</option>
                <option value="brand new">brand new</option>
                <option value="pristine">pristine</option>
                <option value="dirty">dirty</option>
                <option value="damaged">damaged</option>
                <option value="inoperable">inoperable</option>
                <option value="whole / parts missing">whole / parts missing</option>
              </select>
            )}
            {fileName == 'condition_of_celling' && (
              <select
                className="form-control cstm-select"
                name="condition_of_celling"
                {...register('condition_of_celling')}
                id="">
                <option selected value="">
                  Choose an option
                </option>
                <option value="no defect">no defect</option>
                <option value="brand new">brand new</option>
                <option value="pristine">pristine</option>
                <option value="stains">stains</option>
                <option value="holes">holes</option>
                <option value="cracked plaster">cracked plaster</option>
                <option value="other damage">other damage</option>
              </select>
            )}
            {fileName == 'condition_of_curtains_drapes' && (
              <select
                className="form-control cstm-select"
                name="condition_of_curtains_drapes"
                {...register('condition_of_curtains_drapes')}
                id="">
                <option selected value="">
                  Choose an option
                </option>
                <option value="no defect">no defect</option>
                <option value="brand new">brand new</option>
                <option value="pristine">pristine</option>
                <option value="stains">stains</option>
                <option value="holes">holes</option>
                <option value="torn">torn</option>
              </select>
            )}
            {fileName == 'condition_of_doors_locks' && (
              <select
                className="form-control cstm-select"
                name="condition_of_doors_locks"
                {...register('condition_of_doors_locks')}
                id="">
                <option selected value="">
                  Choose an option
                </option>
                <option value="no defect">no defect</option>
                <option value="brand new">brand new</option>
                <option value="pristine">pristine</option>
                <option value="scratches">scratches</option>
                <option value="discoloured">discoloured</option>
                <option value="secured">secured</option>
              </select>
            )}
            {fileName == 'furniture' && (
              <select className="form-control cstm-select" name="furniture" {...register('furniture')} id="">
                <option selected value="">
                  Choose an option
                </option>
                <option value="no defect">no defect</option>
                <option value="brand new">brand new</option>
                <option value="pristine">pristine</option>
                <option value="scratches">scratches</option>
                <option value="burns">burns</option>
                <option value="uphoistery worn">uphoistery worn</option>
                <option value="whole / parts missing">whole / parts missing</option>
              </select>
            )}
            {fileName == 'condition_of_lighting_fixtures' && (
              <select
                className="form-control cstm-select"
                name="condition_of_lighting_fixtures"
                {...register('condition_of_lighting_fixtures')}
                id="">
                <option selected value="">
                  Choose an option
                </option>
                <option value="no defect">no defect</option>
                <option value="brand new">brand new</option>
                <option value="pristine">pristine</option>
                <option value="stains">stains</option>
                <option value="rusty">rusty</option>
                <option value="broken">broken</option>
              </select>
            )}

            {fileName == 'condition_of_windows' && (
              <select
                className="form-control cstm-select"
                name="condition_of_windows"
                {...register('condition_of_windows')}
                id="">
                <option selected value="">
                  Choose an option
                </option>
                <option value="no defect">no defect</option>
                <option value="brand new">brand new</option>
                <option value="pristine">pristine</option>
                <option value="dirty">dirty</option>
                <option value="missing locks">missing locks</option>
                <option value="broken glass or frames">broken glass or frames</option>
              </select>
            )}
          </div>
        </div>
        <div>
          <div className="my-3">
            <h5 className="occupier-title">Image</h5>
            <div className="cond-drag-drop-cont">
              <input
                type="file"
                name="file"
                id=""
                {...register('file', {
                  required: true,
                })}
              />

              {errors?.file?.type === 'required' && <p className="text-danger"> This field is required</p>}
            </div>
          </div>

          <div className="mb-1">
            <div className="rental-proposal-submit-btn-cont">
              <Button
                className="!px-10 !py-2 !rounded-lg !cursor-pointer !text-white !font-roboto !font-medium !text-base !capitalize !bg-[#00ADEE]"
                type="submit">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default ConditionFileUpload
