//using some of the code from example: https://mui.com/components/tree-view/
import SvgIcon from '@mui/material/SvgIcon';

import TreeView from '@mui/lab/TreeView';

import { useEffect, useState } from 'react';
import GetData from '../Functions/GetData';
import { getHospitalId, getLevel, getTrustId } from '../Functions/UserStatus';
import SharingEquipmentItem from './SharingEquipmentItem';
import { Button, Modal } from 'react-bootstrap';
import {Button as MUIButton} from '@mui/material';
import SharingList from './SharingList';

const boxSize = 14; 

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: boxSize, height: boxSize }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: boxSize, height: boxSize }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: boxSize, height: boxSize }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

const SharingEquipmentList = ()=>{
  const [data,setData] = useState([]);
  const [show,setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  useEffect(()=>{
    var level = Number(getLevel());
    console.log(level);
    if (level===2){
      GetData.getAllEquipmentByHospital(getHospitalId()).then((ls)=>{
          setData(ls);    
      });
    }else if (level===3){
      GetData.getAllEquipmentByTrust(getTrustId()).then((ls)=>{
          setData(ls);
          console.log(ls);
      });
    }
  },[]);

  return (
    <SharingList title={"Select Sharing Equipment"} buttonText={"Add Equipment"} component={
    <TreeView
      aria-label="customized"
      defaultExpanded={['1']}
      defaultCollapseIcon={<MinusSquare />}
      defaultExpandIcon={<PlusSquare />}
      defaultEndIcon={<CloseSquare />}
      sx={{ height: 264, flexGrow: 1, maxWidth: 1500, overflowY: 'auto' }}
    >
      <SharingEquipmentItem data={data}/>
    </TreeView>
    }
    />
  );
}

export default SharingEquipmentList;