import { Table } from 'react-bootstrap'
import ActionTooltip from './action-tooltip'
import Info from './info'
import styles from './fee-button.module.css'
import { gql, useQuery } from '@apollo/client'
import { useFormikContext } from 'formik'

function Receipt ({ cost, repetition, hasImgLink, baseFee, parentId, boost }) {
  return (
    <Table className={styles.receipt} borderless size='sm'>
      <tbody>
        <tr>
          <td>{baseFee} sats</td>
          <td align='right' className='font-weight-light'>{parentId ? 'reply' : 'post'} fee</td>
        </tr>
        {hasImgLink &&
          <tr>
            <td>x 10</td>
            <td align='right' className='font-weight-light'>image/link fee</td>
          </tr>}
        {repetition > 0 &&
          <tr>
            <td>x 10<sup>{repetition}</sup></td>
            <td className='font-weight-light' align='right'>{repetition} {parentId ? 'repeat or self replies' : 'posts'} in 10m</td>
          </tr>}
        {boost > 0 &&
          <tr>
            <td>+ {boost} sats</td>
            <td className='font-weight-light' align='right'>boost</td>
          </tr>}
      </tbody>
      <tfoot>
        <tr>
          <td className='font-weight-bold'>{cost} sats</td>
          <td align='right' className='font-weight-light'>total fee</td>
        </tr>
      </tfoot>
    </Table>
  )
}

export default function FeeButton ({ parentId, hasImgLink, baseFee, ChildButton, variant, text, alwaysShow }) {
  const query = parentId
    ? gql`{ itemRepetition(parentId: "${parentId}") }`
    : gql`{ itemRepetition }`
  const { data } = useQuery(query, { pollInterval: 1000 })
  const repetition = data?.itemRepetition || 0
  const formik = useFormikContext()
  const boost = formik?.values?.boost || 0
  const cost = baseFee * (hasImgLink ? 10 : 1) * Math.pow(10, repetition) + Number(boost)

  const show = alwaysShow || !formik?.isSubmitting
  return (
    <div className='d-flex align-items-center'>
      <ActionTooltip overlayText={`${cost} sats`}>
        <ChildButton variant={variant}>{text}{cost > baseFee && show && <small> {cost} sats</small>}</ChildButton>
      </ActionTooltip>
      {cost > baseFee && show &&
        <Info>
          <Receipt baseFee={baseFee} hasImgLink={hasImgLink} repetition={repetition} cost={cost} parentId={parentId} boost={boost} />
        </Info>}
    </div>
  )
}