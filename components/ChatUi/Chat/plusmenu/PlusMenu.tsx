import Confirm from '@/components/chatProgressForm/Confirm'
import store, { showModal } from '@/store'
import { MAKE_RENTAL_PROPOSAL_REQUEST } from '@/store/chatProgress/progress/constant'
import React from 'react'

const PlusMenu = () => {
  const mor = () => {
    (() => {
      store.dispatch(
        showModal({
          open: true,
          name: MAKE_RENTAL_PROPOSAL_REQUEST,
          children: (
            <Confirm message={'Are you sure reuest for rental proposal?.'} ctxtype={MAKE_RENTAL_PROPOSAL_REQUEST} />
          ),
          className: '',
        })
      )
    })()
  }

  return (
    <div className=" w-full grid grid-cols-3 gap-4 px-4 pt-2 pb-6 items-center">
      <div className=" flex gap-2 text-[#c1c1c1] flex-col items-center">
        <svg id="calendar2" xmlns="http://www.w3.org/2000/svg" width="40" height="38" viewBox="0 0 40 38">
          <path
            id="Path_20871"
            data-name="Path 20871"
            d="M36.639,2H32.9V5.8a1.246,1.246,0,1,1-2.492,0V2H10.47V5.8a1.246,1.246,0,1,1-2.492,0V2H4.24C2.371,2,1,3.647,1,5.8v4.56H40.875V5.8c0-2.153-2.243-3.8-4.237-3.8ZM1,13.02V36.2C1,38.48,2.371,40,4.364,40h32.4C38.757,40,41,38.353,41,36.2V13.02ZM12.09,34.3H9.1a.991.991,0,0,1-1-1.013V30.12a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A1.1,1.1,0,0,1,12.09,34.3Zm0-11.4H9.1a.991.991,0,0,1-1-1.013V18.72a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A1.1,1.1,0,0,1,12.09,22.9Zm9.969,11.4H18.944a.991.991,0,0,1-1-1.013V30.12a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A.925.925,0,0,1,22.059,34.3Zm0-11.4H18.944a.991.991,0,0,1-1-1.013V18.72a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A.925.925,0,0,1,22.059,22.9Zm9.969,11.4H28.913a.991.991,0,0,1-1-1.013V30.12a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A.925.925,0,0,1,32.028,34.3Zm0-11.4H28.913a.991.991,0,0,1-1-1.013V18.72a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A.925.925,0,0,1,32.028,22.9Z"
            transform="translate(-1 -2)"
            fill="#00ADEE"
          />
        </svg>
        <p> House Viewing</p>
      </div>
      <div className=" flex gap-2 text-[#c1c1c1] flex-col items-center">
        <svg
          className=" transform -scale-x-100"
          id="coin"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40">
          <g id="Group_11582" data-name="Group 11582" transform="translate(0 21.295)">
            <path
              id="Path_22760"
              data-name="Path 22760"
              d="M86.6,264.123a7.813,7.813,0,0,1,6.38.481c.026.013,7.675,3.47,7.675,3.47a3.027,3.027,0,0,0,1.823.622h4.813a1.081,1.081,0,1,0,0-2.162h-4.813c-1.5,0-1.537-3.1-.064-3.218l6.708-.077c1.184-.013,2.368-.774,3.616-.8a6.145,6.145,0,0,1,3.539.987,8.911,8.911,0,0,1,3.182,4.1l-3.629,9.165H105.392a5.425,5.425,0,0,1-2.689-.715l-16.195-9.264a1.6,1.6,0,0,1-.706-1.654A1.3,1.3,0,0,1,86.6,264.123Z"
              transform="translate(-85.762 -262.433)"
              fill="#00ADEE"
            />
            <path
              id="Path_22761"
              data-name="Path 22761"
              d="M20.865,308.963l-4.946,12.49-3.97-2.18,4.946-12.49Z"
              transform="translate(19.135 -302.747)"
              fill="#00ADEE"
            />
          </g>
          <g id="Group_11583" data-name="Group 11583" transform="translate(0.992)">
            <path
              id="Path_22762"
              data-name="Path 22762"
              d="M243.435,0a9.68,9.68,0,0,0-9.614,9.745,9.615,9.615,0,1,0,19.229,0A9.68,9.68,0,0,0,243.435,0Zm1.093,14.609v1.615H242.3V14.74a4.793,4.793,0,0,1-2.283-.988l.8-2.238a4.243,4.243,0,0,0,2.366.973c.61,0,1-.28,1-.713,0-.282-.091-.619-1.171-1.059-1.353-.534-2.738-1.317-2.738-3.071A2.89,2.89,0,0,1,242.4,4.836V3.265h2.211V4.7a5.4,5.4,0,0,1,1.984.815l-.829,2.2a4.315,4.315,0,0,0-2.12-.783c-.741,0-.822.38-.822.543,0,.256.1.477,1.33.99,1.207.5,2.593,1.308,2.593,3.211A3.064,3.064,0,0,1,244.528,14.609Z"
              transform="translate(-233.821)"
              fill="#00ADEE"
            />
          </g>
        </svg>

        <p onClick={mor}> Rental Proposal</p>
      </div>
      <div className=" flex gap-2 text-[#c1c1c1] flex-col items-center">
        <svg
          id="pay_2_"
          data-name="pay (2)"
          xmlns="http://www.w3.org/2000/svg"
          width="40.001"
          height="40.001"
          viewBox="0 0 40.001 40.001">
          <path
            id="Path_22771"
            data-name="Path 22771"
            d="M79.345,333.932a2.864,2.864,0,0,1-2.762-2.115c-.012-.043-.012-.086-.021-.13l-7.868-4.252a1.4,1.4,0,0,0-.7-.186,1.471,1.471,0,0,0-.274.025,1.341,1.341,0,0,0-.357.116,1.4,1.4,0,0,0-.614.566,1.45,1.45,0,0,0-.191.714,1.42,1.42,0,0,0,.71,1.24L80.291,337.7a2.149,2.149,0,0,0,1.138.327H91.494a2.151,2.151,0,0,0,.786-.15l2.623-1.036v-7.7l-2.554-1.529a2.142,2.142,0,0,0-1.1-.3H88.51a5,5,0,0,0-1.291.17l-8.245,2.206a1.444,1.444,0,0,0-1.052,1.26v.234a1.3,1.3,0,0,0,.041.264,1.429,1.429,0,0,0,1.382,1.052c.087-.007.507-.093.833-.168l7.4-1.979.368,1.38-7.421,1.986a6.985,6.985,0,0,1-1.177.21Zm0,0"
            transform="translate(-60.616 -298.03)"
            fill="#00ADEE"
          />
          <path
            id="Path_22772"
            data-name="Path 22772"
            d="M400,320h4.286v11.429H400Zm0,0"
            transform="translate(-364.285 -291.428)"
            fill="#00ADEE"
          />
          <path id="Path_22773" data-name="Path 22773" d="M0,0H4.286V12.857H0ZM0,0" fill="#00ADEE" />
          <path
            id="Path_22774"
            data-name="Path 22774"
            d="M66.437,11.24a6.442,6.442,0,0,0,3.277,1.069V8.857a5.194,5.194,0,0,1-1.46-.82L67.836,7.7l.9-1.11.414.336a3.786,3.786,0,0,0,4.815-.071l.5-.429,4.214,4.214A1.432,1.432,0,1,0,80.7,8.608L75.66,3.562l1.01-1.01L78.4,4.286H84.3L81.476,1.464A4.966,4.966,0,0,0,77.94,0H68.96A2.144,2.144,0,0,0,68,.226l-1.6.8a3.586,3.586,0,0,1-1.727.374L64,1.377v9.337h1.643Zm0,0"
            transform="translate(-58.286 0)"
            fill="#00ADEE"
          />
          <path
            id="Path_22775"
            data-name="Path 22775"
            d="M144,67.442V79.715h27.144V64H152.689l1.429,1.429h12.026v.714A2.857,2.857,0,0,0,169,69h.714v5.714H169a2.857,2.857,0,0,0-2.857,2.857v.714H149v-.714a2.857,2.857,0,0,0-2.857-2.857h-.714V69h.714a2.851,2.851,0,0,0,2.294-1.161l-1.219-1.219a5.2,5.2,0,0,1-3.218.821Zm0,0"
            transform="translate(-131.143 -58.286)"
            fill="#00ADEE"
          />
          <path
            id="Path_22776"
            data-name="Path 22776"
            d="M181.694,99.907a2.857,2.857,0,0,1-2.019-.828L178.6,98a4.264,4.264,0,0,1-2.6,1.512v2.976A4.3,4.3,0,0,1,179.512,106h14.4a4.3,4.3,0,0,1,3.512-3.512V99.512A4.3,4.3,0,0,1,193.916,96h-9.565a2.809,2.809,0,0,1-.234,2.564,3.571,3.571,0,1,1-.406.518,2.876,2.876,0,0,1-2.017.825Zm0,0"
            transform="translate(-160.285 -87.429)"
            fill="#00ADEE"
          />
          <path
            id="Path_22777"
            data-name="Path 22777"
            d="M276.286,130.143A2.143,2.143,0,1,1,274.143,128,2.143,2.143,0,0,1,276.286,130.143Zm0,0"
            transform="translate(-247.714 -116.571)"
            fill="#00ADEE"
          />
        </svg>

        <p> Reservation Fee</p>
      </div>
      <div className=" flex gap-2 text-[#c1c1c1] flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
          <path
            id="agreement_2_"
            data-name="agreement (2)"
            d="M31.236,40H2.637a.811.811,0,0,1-.812-.806V.805A.811.811,0,0,1,2.637,0H25.153V4.412A2.446,2.446,0,0,0,27.6,6.845h4.444V20.334a5.092,5.092,0,0,0-1.856.678l-.911-.315a5.435,5.435,0,0,0-3.265.034,2.9,2.9,0,0,1-2.089.012l-.039-.021-1.932-.885a2.056,2.056,0,0,0-2.709.98l-2.127,4.492a2.025,2.025,0,0,0,1.013,2.717c.64.286,1.314.61,1.965.861.187.072.237.309.278.482l.294,1.223-.457.847a1.979,1.979,0,0,0,1.765,2.911,1.98,1.98,0,0,0,2.55,2.153,2.051,2.051,0,0,0,.341-.137,1.976,1.976,0,0,0,.853.882,2,2,0,0,0,1.518.147q.09-.027.176-.062a1.977,1.977,0,0,0,.908,1,2.008,2.008,0,0,0,2.514-.531l.594.324a1.993,1.993,0,0,0,.615.215v.848A.811.811,0,0,1,31.236,40Zm-9.965-7.417a.726.726,0,0,0,.353.433.746.746,0,0,0,.992-.3s.895-1.66.895-1.66a.737.737,0,0,0-.3-.986.747.747,0,0,0-.995.3l-.893,1.657A.722.722,0,0,0,21.271,32.582Zm.157-11.611a.791.791,0,0,0-1.042.377L18.26,25.84a.779.779,0,0,0,.389,1.045c.777.347,1.7.756,1.9.836A1.742,1.742,0,0,1,21.6,29.078a2.1,2.1,0,0,1,.66-.336,2.077,2.077,0,0,1,1.582.154,2.051,2.051,0,0,1,1.006,1.218c.021.07.038.14.053.21a2.072,2.072,0,0,1,1.24.226,2.045,2.045,0,0,1,.978,1.141,2.073,2.073,0,0,1,1.5.175,2.042,2.042,0,0,1,.978,1.141,2.077,2.077,0,0,1,1.5.176,2.054,2.054,0,0,1,.587.467L33.8,34.808a.731.731,0,1,0,.7-1.282l-3-1.678a.664.664,0,0,1-.255-.908.673.673,0,0,1,.914-.254l3.8,2.106a.731.731,0,1,0,.7-1.281l-3-1.686a.663.663,0,0,1-.254-.908.674.674,0,0,1,.915-.252L37.8,30.62a.731.731,0,1,0,.693-1.287l-4.863-2.752c-.759-.43-1.758-.028-2.915.436-1.763.708-4.177,1.679-6.156-1.029a.664.664,0,0,1,.21-.97,16.645,16.645,0,0,0,3.569-2.644q.263-.264.529-.5a4.344,4.344,0,0,0-2.562.07,3.921,3.921,0,0,1-2.986-.109Zm13.348,1.116c-1.283-.521-2.495-1.012-4.314.237a8.315,8.315,0,0,0-1.171.989,17.189,17.189,0,0,1-3.165,2.454c1.143,1.107,2.343.714,4.084.015a7.508,7.508,0,0,1,2.685-.721,2.778,2.778,0,0,1,1.4.362l4.864,2.752a2.115,2.115,0,0,1,.5.4l1.686-.714a.78.78,0,0,0,.425-1l-1.824-4.671a.789.789,0,0,0-1.1-.406l-1.025.545a3.425,3.425,0,0,1-3.041-.239Zm-1.74,14.66a.73.73,0,0,0-.291-.991l-.594-.324a2.053,2.053,0,0,1-.2.543l-.421.783.508.277a.738.738,0,0,0,1-.288Zm-3.559.541a.725.725,0,0,0,.435-.352l.856-1.59a.737.737,0,0,0-.3-.986.748.748,0,0,0-1,.3l-.856,1.59a.73.73,0,0,0,.86,1.04Zm-2.6-1.09a.726.726,0,0,0,.435-.353l.979-1.816a.738.738,0,0,0-.3-.987.748.748,0,0,0-1,.3l-.978,1.816a.731.731,0,0,0,.861,1.041Zm-2.713-.893a.733.733,0,0,0,.437-.347c0-.006,1.209-2.246,1.209-2.246a.733.733,0,0,0-1.294-.69L23.3,34.27a.725.725,0,0,0,.859,1.035ZM26.412.069V4.412A1.19,1.19,0,0,0,27.6,5.6h4.374a.809.809,0,0,0-.167-.236L26.642.228a.811.811,0,0,0-.231-.159ZM6.5,10.409l.72-.519v6.486a1.7,1.7,0,0,0,1.7,1.686h2.175v-5.6a.8.8,0,0,1,.8-.793h1.694a.8.8,0,0,1,.8.793v5.6h2.175a1.7,1.7,0,0,0,1.7-1.686V9.89l.72.519a1.193,1.193,0,0,0,1.658-.263A1.174,1.174,0,0,0,20.365,8.5L13.451,3.512A1.2,1.2,0,0,0,12.037,3.5L5.1,8.5a1.174,1.174,0,0,0-.265,1.647,1.193,1.193,0,0,0,1.658.263Zm.72,24.077h9.664a.645.645,0,1,0,0-1.29H7.215a.645.645,0,1,0,0,1.29Zm0-7.742H14.2a.645.645,0,1,0,0-1.29H7.215a.645.645,0,1,0,0,1.29Zm0-3.871H14.2a.645.645,0,1,0,0-1.29H7.215a.645.645,0,1,0,0,1.29Zm0,7.742h9.664a.645.645,0,1,0,0-1.29H7.215a.645.645,0,1,0,0,1.29Z"
            transform="translate(-1.825 0.001)"
            fill="#00ADEE"
            fillRule="evenodd"
          />
        </svg>

        <p> Agreement</p>
      </div>
      <div className=" flex gap-2 text-[#c1c1c1] flex-col items-center">
        <svg
          id="pay_2_"
          data-name="pay (2)"
          xmlns="http://www.w3.org/2000/svg"
          width="40.001"
          height="40.001"
          viewBox="0 0 40.001 40.001">
          <path
            id="Path_22771"
            data-name="Path 22771"
            d="M79.345,333.932a2.864,2.864,0,0,1-2.762-2.115c-.012-.043-.012-.086-.021-.13l-7.868-4.252a1.4,1.4,0,0,0-.7-.186,1.471,1.471,0,0,0-.274.025,1.341,1.341,0,0,0-.357.116,1.4,1.4,0,0,0-.614.566,1.45,1.45,0,0,0-.191.714,1.42,1.42,0,0,0,.71,1.24L80.291,337.7a2.149,2.149,0,0,0,1.138.327H91.494a2.151,2.151,0,0,0,.786-.15l2.623-1.036v-7.7l-2.554-1.529a2.142,2.142,0,0,0-1.1-.3H88.51a5,5,0,0,0-1.291.17l-8.245,2.206a1.444,1.444,0,0,0-1.052,1.26v.234a1.3,1.3,0,0,0,.041.264,1.429,1.429,0,0,0,1.382,1.052c.087-.007.507-.093.833-.168l7.4-1.979.368,1.38-7.421,1.986a6.985,6.985,0,0,1-1.177.21Zm0,0"
            transform="translate(-60.616 -298.03)"
            fill="#00ADEE"
          />
          <path
            id="Path_22772"
            data-name="Path 22772"
            d="M400,320h4.286v11.429H400Zm0,0"
            transform="translate(-364.285 -291.428)"
            fill="#00ADEE"
          />
          <path id="Path_22773" data-name="Path 22773" d="M0,0H4.286V12.857H0ZM0,0" fill="#00ADEE" />
          <path
            id="Path_22774"
            data-name="Path 22774"
            d="M66.437,11.24a6.442,6.442,0,0,0,3.277,1.069V8.857a5.194,5.194,0,0,1-1.46-.82L67.836,7.7l.9-1.11.414.336a3.786,3.786,0,0,0,4.815-.071l.5-.429,4.214,4.214A1.432,1.432,0,1,0,80.7,8.608L75.66,3.562l1.01-1.01L78.4,4.286H84.3L81.476,1.464A4.966,4.966,0,0,0,77.94,0H68.96A2.144,2.144,0,0,0,68,.226l-1.6.8a3.586,3.586,0,0,1-1.727.374L64,1.377v9.337h1.643Zm0,0"
            transform="translate(-58.286 0)"
            fill="#00ADEE"
          />
          <path
            id="Path_22775"
            data-name="Path 22775"
            d="M144,67.442V79.715h27.144V64H152.689l1.429,1.429h12.026v.714A2.857,2.857,0,0,0,169,69h.714v5.714H169a2.857,2.857,0,0,0-2.857,2.857v.714H149v-.714a2.857,2.857,0,0,0-2.857-2.857h-.714V69h.714a2.851,2.851,0,0,0,2.294-1.161l-1.219-1.219a5.2,5.2,0,0,1-3.218.821Zm0,0"
            transform="translate(-131.143 -58.286)"
            fill="#00ADEE"
          />
          <path
            id="Path_22776"
            data-name="Path 22776"
            d="M181.694,99.907a2.857,2.857,0,0,1-2.019-.828L178.6,98a4.264,4.264,0,0,1-2.6,1.512v2.976A4.3,4.3,0,0,1,179.512,106h14.4a4.3,4.3,0,0,1,3.512-3.512V99.512A4.3,4.3,0,0,1,193.916,96h-9.565a2.809,2.809,0,0,1-.234,2.564,3.571,3.571,0,1,1-.406.518,2.876,2.876,0,0,1-2.017.825Zm0,0"
            transform="translate(-160.285 -87.429)"
            fill="#00ADEE"
          />
          <path
            id="Path_22777"
            data-name="Path 22777"
            d="M276.286,130.143A2.143,2.143,0,1,1,274.143,128,2.143,2.143,0,0,1,276.286,130.143Zm0,0"
            transform="translate(-247.714 -116.571)"
            fill="#00ADEE"
          />
        </svg>
        <p> 1st Month Rental</p>
      </div>
      <div className=" flex gap-2 text-[#c1c1c1] flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
          <path
            id="agreement_2_"
            data-name="agreement (2)"
            d="M31.236,40H2.637a.811.811,0,0,1-.812-.806V.805A.811.811,0,0,1,2.637,0H25.153V4.412A2.446,2.446,0,0,0,27.6,6.845h4.444V20.334a5.092,5.092,0,0,0-1.856.678l-.911-.315a5.435,5.435,0,0,0-3.265.034,2.9,2.9,0,0,1-2.089.012l-.039-.021-1.932-.885a2.056,2.056,0,0,0-2.709.98l-2.127,4.492a2.025,2.025,0,0,0,1.013,2.717c.64.286,1.314.61,1.965.861.187.072.237.309.278.482l.294,1.223-.457.847a1.979,1.979,0,0,0,1.765,2.911,1.98,1.98,0,0,0,2.55,2.153,2.051,2.051,0,0,0,.341-.137,1.976,1.976,0,0,0,.853.882,2,2,0,0,0,1.518.147q.09-.027.176-.062a1.977,1.977,0,0,0,.908,1,2.008,2.008,0,0,0,2.514-.531l.594.324a1.993,1.993,0,0,0,.615.215v.848A.811.811,0,0,1,31.236,40Zm-9.965-7.417a.726.726,0,0,0,.353.433.746.746,0,0,0,.992-.3s.895-1.66.895-1.66a.737.737,0,0,0-.3-.986.747.747,0,0,0-.995.3l-.893,1.657A.722.722,0,0,0,21.271,32.582Zm.157-11.611a.791.791,0,0,0-1.042.377L18.26,25.84a.779.779,0,0,0,.389,1.045c.777.347,1.7.756,1.9.836A1.742,1.742,0,0,1,21.6,29.078a2.1,2.1,0,0,1,.66-.336,2.077,2.077,0,0,1,1.582.154,2.051,2.051,0,0,1,1.006,1.218c.021.07.038.14.053.21a2.072,2.072,0,0,1,1.24.226,2.045,2.045,0,0,1,.978,1.141,2.073,2.073,0,0,1,1.5.175,2.042,2.042,0,0,1,.978,1.141,2.077,2.077,0,0,1,1.5.176,2.054,2.054,0,0,1,.587.467L33.8,34.808a.731.731,0,1,0,.7-1.282l-3-1.678a.664.664,0,0,1-.255-.908.673.673,0,0,1,.914-.254l3.8,2.106a.731.731,0,1,0,.7-1.281l-3-1.686a.663.663,0,0,1-.254-.908.674.674,0,0,1,.915-.252L37.8,30.62a.731.731,0,1,0,.693-1.287l-4.863-2.752c-.759-.43-1.758-.028-2.915.436-1.763.708-4.177,1.679-6.156-1.029a.664.664,0,0,1,.21-.97,16.645,16.645,0,0,0,3.569-2.644q.263-.264.529-.5a4.344,4.344,0,0,0-2.562.07,3.921,3.921,0,0,1-2.986-.109Zm13.348,1.116c-1.283-.521-2.495-1.012-4.314.237a8.315,8.315,0,0,0-1.171.989,17.189,17.189,0,0,1-3.165,2.454c1.143,1.107,2.343.714,4.084.015a7.508,7.508,0,0,1,2.685-.721,2.778,2.778,0,0,1,1.4.362l4.864,2.752a2.115,2.115,0,0,1,.5.4l1.686-.714a.78.78,0,0,0,.425-1l-1.824-4.671a.789.789,0,0,0-1.1-.406l-1.025.545a3.425,3.425,0,0,1-3.041-.239Zm-1.74,14.66a.73.73,0,0,0-.291-.991l-.594-.324a2.053,2.053,0,0,1-.2.543l-.421.783.508.277a.738.738,0,0,0,1-.288Zm-3.559.541a.725.725,0,0,0,.435-.352l.856-1.59a.737.737,0,0,0-.3-.986.748.748,0,0,0-1,.3l-.856,1.59a.73.73,0,0,0,.86,1.04Zm-2.6-1.09a.726.726,0,0,0,.435-.353l.979-1.816a.738.738,0,0,0-.3-.987.748.748,0,0,0-1,.3l-.978,1.816a.731.731,0,0,0,.861,1.041Zm-2.713-.893a.733.733,0,0,0,.437-.347c0-.006,1.209-2.246,1.209-2.246a.733.733,0,0,0-1.294-.69L23.3,34.27a.725.725,0,0,0,.859,1.035ZM26.412.069V4.412A1.19,1.19,0,0,0,27.6,5.6h4.374a.809.809,0,0,0-.167-.236L26.642.228a.811.811,0,0,0-.231-.159ZM6.5,10.409l.72-.519v6.486a1.7,1.7,0,0,0,1.7,1.686h2.175v-5.6a.8.8,0,0,1,.8-.793h1.694a.8.8,0,0,1,.8.793v5.6h2.175a1.7,1.7,0,0,0,1.7-1.686V9.89l.72.519a1.193,1.193,0,0,0,1.658-.263A1.174,1.174,0,0,0,20.365,8.5L13.451,3.512A1.2,1.2,0,0,0,12.037,3.5L5.1,8.5a1.174,1.174,0,0,0-.265,1.647,1.193,1.193,0,0,0,1.658.263Zm.72,24.077h9.664a.645.645,0,1,0,0-1.29H7.215a.645.645,0,1,0,0,1.29Zm0-7.742H14.2a.645.645,0,1,0,0-1.29H7.215a.645.645,0,1,0,0,1.29Zm0-3.871H14.2a.645.645,0,1,0,0-1.29H7.215a.645.645,0,1,0,0,1.29Zm0,7.742h9.664a.645.645,0,1,0,0-1.29H7.215a.645.645,0,1,0,0,1.29Z"
            transform="translate(-1.825 0.001)"
            fill="#00ADEE"
            fillRule="evenodd"
          />
        </svg>

        <p> Sign Agreement</p>
      </div>
      <div className=" flex gap-2 text-[#c1c1c1] flex-col items-center">
        <svg id="calendar2" xmlns="http://www.w3.org/2000/svg" width="40" height="38" viewBox="0 0 40 38">
          <path
            id="Path_20871"
            data-name="Path 20871"
            d="M36.639,2H32.9V5.8a1.246,1.246,0,1,1-2.492,0V2H10.47V5.8a1.246,1.246,0,1,1-2.492,0V2H4.24C2.371,2,1,3.647,1,5.8v4.56H40.875V5.8c0-2.153-2.243-3.8-4.237-3.8ZM1,13.02V36.2C1,38.48,2.371,40,4.364,40h32.4C38.757,40,41,38.353,41,36.2V13.02ZM12.09,34.3H9.1a.991.991,0,0,1-1-1.013V30.12a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A1.1,1.1,0,0,1,12.09,34.3Zm0-11.4H9.1a.991.991,0,0,1-1-1.013V18.72a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A1.1,1.1,0,0,1,12.09,22.9Zm9.969,11.4H18.944a.991.991,0,0,1-1-1.013V30.12a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A.925.925,0,0,1,22.059,34.3Zm0-11.4H18.944a.991.991,0,0,1-1-1.013V18.72a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A.925.925,0,0,1,22.059,22.9Zm9.969,11.4H28.913a.991.991,0,0,1-1-1.013V30.12a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A.925.925,0,0,1,32.028,34.3Zm0-11.4H28.913a.991.991,0,0,1-1-1.013V18.72a.991.991,0,0,1,1-1.013h3.115a.991.991,0,0,1,1,1.013v3.167A.925.925,0,0,1,32.028,22.9Z"
            transform="translate(-1 -2)"
            fill="#00ADEE"
          />
        </svg>
        <p>Key HandOver</p>
      </div>
      <div className=" flex gap-2 text-[#c1c1c1] flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
          <g id="report_1_" data-name="report (1)" transform="translate(-4 -4)">
            <path
              id="Path_22834"
              data-name="Path 22834"
              d="M47.222,10h-4.3v3.57a2.152,2.152,0,0,1-2.149,2.142H27.88a2.152,2.152,0,0,1-2.149-2.142V10h-4.3A1.435,1.435,0,0,0,20,11.428V18l.716-.628,14.2,12.488L31.462,33.77v10.5a2.842,2.842,0,0,1-.387,1.428H47.222a1.435,1.435,0,0,0,1.433-1.428V11.428A1.435,1.435,0,0,0,47.222,10ZM44.356,42.132H34.327a.714.714,0,1,1,0-1.428H44.356a.714.714,0,1,1,0,1.428Zm0-3.57H34.327a.714.714,0,1,1,0-1.428H44.356a.714.714,0,1,1,0,1.428Zm0-3.57h-9.52a.714.714,0,1,1,0-1.428h9.52a.714.714,0,1,1,0,1.428Zm0-3.57H37.995a.714.714,0,1,1,0-1.428h6.361a.714.714,0,1,1,0,1.428Zm0-3.57H36.147a.714.714,0,1,1,0-1.428h8.209a.714.714,0,1,1,0,1.428Zm0-3.57H32.085a.714.714,0,1,1,0-1.428H44.356a.714.714,0,1,1,0,1.428Zm0-3.57H28.023a.714.714,0,1,1,0-1.428H44.356a.714.714,0,1,1,0,1.428Z"
              transform="translate(-4.654 -1.702)"
              fill="#00ADEE"
            />
            <path
              id="Path_22835"
              data-name="Path 22835"
              d="M40.745,6.865A2.865,2.865,0,0,0,37.88,4H36.447a2.865,2.865,0,0,0-2.865,2.865H30.716A.718.718,0,0,0,30,7.582v4.3a.718.718,0,0,0,.716.716H43.611a.718.718,0,0,0,.716-.716v-4.3a.718.718,0,0,0-.716-.716Z"
              transform="translate(-7.459)"
              fill="#00ADEE"
            />
            <path
              id="Path_22836"
              data-name="Path 22836"
              d="M17.313,31,8,39.217V50.342a1.437,1.437,0,0,0,1.433,1.433h4.3v-8.6h7.164v8.6h4.3a1.437,1.437,0,0,0,1.433-1.433V39.217Zm0,7.88a2.149,2.149,0,1,1,2.149-2.149A2.146,2.146,0,0,1,17.313,38.88Z"
              transform="translate(-1.135 -7.774)"
              fill="#00ADEE"
            />
            <path
              id="Path_22837"
              data-name="Path 22837"
              d="M28.356,33.745l-1.9,2.149-10.28-9.076L5.9,35.894,4,33.745,16.178,23Z"
              transform="translate(0 -5.447)"
              fill="#00ADEE"
            />
          </g>
        </svg>
        <p> Condition Report</p>
      </div>
      <div className=" flex gap-2 text-[#c1c1c1]  flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
          <g id="report_1_" data-name="report (1)" transform="translate(-4 -4)">
            <path
              id="Path_22834"
              data-name="Path 22834"
              d="M47.222,10h-4.3v3.57a2.152,2.152,0,0,1-2.149,2.142H27.88a2.152,2.152,0,0,1-2.149-2.142V10h-4.3A1.435,1.435,0,0,0,20,11.428V18l.716-.628,14.2,12.488L31.462,33.77v10.5a2.842,2.842,0,0,1-.387,1.428H47.222a1.435,1.435,0,0,0,1.433-1.428V11.428A1.435,1.435,0,0,0,47.222,10ZM44.356,42.132H34.327a.714.714,0,1,1,0-1.428H44.356a.714.714,0,1,1,0,1.428Zm0-3.57H34.327a.714.714,0,1,1,0-1.428H44.356a.714.714,0,1,1,0,1.428Zm0-3.57h-9.52a.714.714,0,1,1,0-1.428h9.52a.714.714,0,1,1,0,1.428Zm0-3.57H37.995a.714.714,0,1,1,0-1.428h6.361a.714.714,0,1,1,0,1.428Zm0-3.57H36.147a.714.714,0,1,1,0-1.428h8.209a.714.714,0,1,1,0,1.428Zm0-3.57H32.085a.714.714,0,1,1,0-1.428H44.356a.714.714,0,1,1,0,1.428Zm0-3.57H28.023a.714.714,0,1,1,0-1.428H44.356a.714.714,0,1,1,0,1.428Z"
              transform="translate(-4.654 -1.702)"
              fill="#00ADEE"
            />
            <path
              id="Path_22835"
              data-name="Path 22835"
              d="M40.745,6.865A2.865,2.865,0,0,0,37.88,4H36.447a2.865,2.865,0,0,0-2.865,2.865H30.716A.718.718,0,0,0,30,7.582v4.3a.718.718,0,0,0,.716.716H43.611a.718.718,0,0,0,.716-.716v-4.3a.718.718,0,0,0-.716-.716Z"
              transform="translate(-7.459)"
              fill="#00ADEE"
            />
            <path
              id="Path_22836"
              data-name="Path 22836"
              d="M17.313,31,8,39.217V50.342a1.437,1.437,0,0,0,1.433,1.433h4.3v-8.6h7.164v8.6h4.3a1.437,1.437,0,0,0,1.433-1.433V39.217Zm0,7.88a2.149,2.149,0,1,1,2.149-2.149A2.146,2.146,0,0,1,17.313,38.88Z"
              transform="translate(-1.135 -7.774)"
              fill="#00ADEE"
            />
            <path
              id="Path_22837"
              data-name="Path 22837"
              d="M28.356,33.745l-1.9,2.149-10.28-9.076L5.9,35.894,4,33.745,16.178,23Z"
              transform="translate(0 -5.447)"
              fill="#00ADEE"
            />
          </g>
        </svg>
        <p> Inventory List</p>
      </div>
    </div>
  )
}

export default PlusMenu
