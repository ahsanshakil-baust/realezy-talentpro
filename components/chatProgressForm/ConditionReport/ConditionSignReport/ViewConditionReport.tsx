import React, { useState } from 'react'

const ViewConditionReport = ({ data }: any) => {
  return (
    <div>
      {data?.propertyConditionReportList?.appliances.length > 0 && (
        <div className="mb-3">
          <h5 className="occupier-title">
            {data?.propertyConditionReportList?.appliances.length > 0 ? 'appliances' : null}
          </h5>
          <div className="landlord-prop-condition-cont">
            {data?.propertyConditionReportList?.appliances?.map((item: any) => (
              <img key={item.toString()} src={item.image ? item.image : null} alt="" />
            ))}
          </div>
        </div>
      )}
      {data?.propertyConditionReportList?.condition_of_celling.length > 0 && (
        <div className="mb-3">
          <h5 className="occupier-title">
            {data?.propertyConditionReportList?.condition_of_celling.length > 0 ? 'condition of celling' : null}
          </h5>
          <div className="landlord-prop-condition-cont">
            {data?.propertyConditionReportList?.condition_of_celling?.map((item: any) => (
              <img key={item.toString()} src={item.image ? item.image : null} alt="" />
            ))}
          </div>
        </div>
      )}
      {data?.propertyConditionReportList?.condition_of_curtains_drapes.length > 0 && (
        <div className="mb-3">
          <h5 className="occupier-title">
            {data?.propertyConditionReportList?.condition_of_curtains_drapes.length > 0
              ? 'condition of curtains drapes'
              : null}
          </h5>
          <div className="landlord-prop-condition-cont">
            {data?.propertyConditionReportList?.condition_of_curtains_drapes?.map((item: any) => (
              <img key={item.toString()} src={item.image ? item.image : null} alt="" />
            ))}
          </div>
        </div>
      )}
      {data?.propertyConditionReportList?.condition_of_doors_locks.length > 0 && (
        <div className="mb-3">
          <h5 className="occupier-title">
            {data?.propertyConditionReportList?.condition_of_doors_locks.length > 0 ? 'condition of doors locks' : null}
          </h5>
          <div className="landlord-prop-condition-cont">
            {data?.propertyConditionReportList?.condition_of_doors_locks?.map((item: any) => (
              <img key={item.toString()} src={item.image ? item.image : null} alt="" />
            ))}
          </div>
        </div>
      )}
      {data?.propertyConditionReportList?.condition_of_floor.length > 0 && (
        <div className="mb-3">
          <h5 className="occupier-title">
            {data?.propertyConditionReportList?.condition_of_floor.length > 0 ? 'condition of floor' : null}
          </h5>
          <div className="landlord-prop-condition-cont">
            {data?.propertyConditionReportList?.condition_of_floor?.map((item: any) => (
              <img key={item.toString()} src={item.image ? item.image : null} alt="" />
            ))}
          </div>
        </div>
      )}
      {data?.propertyConditionReportList?.condition_of_lighting_fixtures.length > 0 && (
        <div className="mb-3">
          <h5 className="occupier-title">
            {data?.propertyConditionReportList?.condition_of_lighting_fixtures.length > 0
              ? 'condition of lighting fixtures'
              : null}
          </h5>
          <div className="landlord-prop-condition-cont">
            {data?.propertyConditionReportList?.condition_of_lighting_fixtures?.map((item: any) => (
              <img key={item.toString()} src={item.image ? item.image : null} alt="" />
            ))}
          </div>
        </div>
      )}
      {data?.propertyConditionReportList?.condition_of_walls.length > 0 && (
        <div className="mb-3 tenant-cond-report-signing-form-row">
          <h5 className="occupier-title">
            {data?.propertyConditionReportList?.condition_of_walls.length > 0 ? 'condition of walls' : null}
          </h5>
          <div className="landlord-prop-condition-cont">
            {data?.propertyConditionReportList?.condition_of_walls?.map((item: any) => (
              <img key={item.toString()} src={item.image ? item.image : null} alt="" />
            ))}
          </div>
        </div>
      )}

      {data?.propertyConditionReportList?.condition_of_windows.length > 0 && (
        <div className="mb-3">
          <h5 className="occupier-title">
            {data?.propertyConditionReportList?.condition_of_windows.length > 0 ? 'condition of windows' : null}
          </h5>
          <div className="landlord-prop-condition-cont">
            {data?.propertyConditionReportList?.condition_of_windows?.map((item: any) => (
              <img key={item.toString()} src={item.image ? item.image : null} alt="" />
            ))}
          </div>
        </div>
      )}
      {data?.propertyConditionReportList?.furniture.length > 0 && (
        <div className="mb-3">
          <h5 className="occupier-title">
            {data?.propertyConditionReportList?.furniture.length > 0 ? 'furniture' : null}
          </h5>
          <div className="landlord-prop-condition-cont">
            {data?.propertyConditionReportList?.furniture?.map((item: any) => (
              <img key={item.toString()} src={item.image ? item.image : null} alt="" />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewConditionReport
