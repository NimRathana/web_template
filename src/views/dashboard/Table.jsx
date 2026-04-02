'use client'

// MUI Imports
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import classnames from 'classnames'
import tableStyles from '@core/styles/table.module.css'
import { useSettings } from '@core/hooks/useSettings'

const rowsData = [
  {
    name: 'Jordan Stevenson',
    username: '@amiccoo',
    email: 'Jacinthe_Blick@hotmail.com',
    iconClass: 'text-primary',
    roleIcon: 'ri-vip-crown-line',
    role: 'Admin',
    status: 'pending'
  },
  {
    name: 'Richard Payne',
    username: '@brossiter15',
    email: 'Jaylon_Bartell3@gmail.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'active'
  },
  {
    name: 'Jennifer Summers',
    username: '@jsbemblinf',
    email: 'Tristin_Johnson@gmail.com',
    iconClass: 'text-error',
    roleIcon: 'ri-computer-line',
    role: 'Author',
    status: 'active'
  },
  {
    name: 'Mr. Justin Richardson',
    username: '@justin45',
    email: 'Toney21@yahoo.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'pending'
  },
  {
    name: 'Nicholas Tanner',
    username: '@tannernic',
    email: 'Hunter_Kuhic68@hotmail.com',
    iconClass: 'text-info',
    roleIcon: 'ri-pie-chart-2-line',
    role: 'Maintainer',
    status: 'active'
  },
  {
    name: 'Crystal Mays',
    username: '@crystal99',
    email: 'Norene_Bins@yahoo.com',
    iconClass: 'text-warning',
    roleIcon: 'ri-edit-box-line',
    role: 'Editor',
    status: 'pending'
  },
  {
    name: 'Mary Garcia',
    username: '@marygarcia4',
    email: 'Emmitt.Walker14@hotmail.com',
    iconClass: 'text-info',
    roleIcon: 'ri-pie-chart-2-line',
    role: 'Maintainer',
    status: 'inactive'
  },
  {
    name: 'Megan Roberts',
    username: '@megan78',
    email: 'Patrick.Howe73@gmail.com',
    iconClass: 'text-success',
    roleIcon: 'ri-user-3-line',
    role: 'Subscriber',
    status: 'active'
  }
]

const Table = () => {
  const { settings } = useSettings()
  return (
    <Card>
      <Button variant='contained'>
        {settings.primaryColor}
      </Button>
      <Chip
        variant='outlined'
        color='primary'
        label='Nim Rathana'
      />
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rowsData.map((row, index) => (
              <tr key={index}>
                <td className='!plb-1'>
                  <div className='flex items-center gap-3'>
                    <div className='flex flex-col'>
                      <Typography color='text.primary' className='font-medium'>
                        {row.name}
                      </Typography>
                      <Typography variant='body2'>{row.username}</Typography>
                    </div>
                  </div>
                </td>
                <td className='!plb-1'>
                  <Typography>{row.email}</Typography>
                </td>
                <td className='!plb-1'>
                  <div className='flex gap-2'>
                    <i className={classnames(row.roleIcon, row.iconClass, 'text-[22px]')} />
                    <Typography color='text.primary'>{row.role}</Typography>
                  </div>
                </td>
                <td className='!pb-1'>
                  <Chip
                    className='capitalize'
                    variant='tonal'
                    color={row.status === 'pending' ? 'warning' : row.status === 'inactive' ? 'secondary' : 'success'}
                    label={row.status}
                    size='small'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default Table
