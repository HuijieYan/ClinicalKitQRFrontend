import { useEffect, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { Checkbox, FormControlLabel } from '@mui/material';
import GetData from "../Functions/GetData";

const StyledTreeItem = styled((props) => (
    <TreeItem {...props} />
  ))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      '& .close': {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  }));

const SharingListItems = () => {
    const [data,setData] = useState([]);
    const [rows,setRows] = useState([]);
    const [selected,setSelected] = useState([]);
    const [selectedIndex,setSelectedIndex] = useState(-1);
    const [specialIndexDict,setSpecialIndexDict] = useState({});
    
    const checkSelected = (i)=>{
        console.log("Check Selected "+i);
        return selected.indexOf(i) !== -1;
      }

    const handleSelected = (i)=>{
      console.log(i);  
      setSelectedIndex(i);
    };


    const generateDisplayName = (group)=>{
        var displayStr = "";
        if(group.specialty===null){
          displayStr = group.name;
        }else{
          displayStr = group.name+"-"+group.specialty.specialty;
        }
        return displayStr;
      }

    useEffect(()=>{
      var ls = [...selected];
      if (selected.indexOf(selectedIndex)===-1&&selectedIndex!==-1){
        ls.push(selectedIndex);
      }else{
        ls.splice(selectedIndex,1);
      }
      console.log(ls);
      setSelected(ls);
    },[selectedIndex]);

    useEffect(()=>{
        console.log(data);
        var row = [];
        var selectedIndex = 0;
        var hospitalRows = [];
        //contains rows within a hospital
        var trustRows = [];
        //contains rows within a trust
        var trustId = -1;
        var hospitalId = -1;
        var hospitalName = "";
        var trustIndex = 0;
        var trustName = "";
        var hospitalIndex = 0;
        var specialIndex = data.length;
        
        if (data.length>0){
            var group = data[0];
            var hosiptal = group.hospitalId;
            var trust = hosiptal.trust;

            trustId = trust.trustId;
            trustName = trust.trustName;
            hospitalId = hosiptal.hospitalId;
            hospitalName = hosiptal.hospitalName;
            //set the hospital and trust pointer to current hospital
        }

        for (let i = 0;i<data.length;i++){
            var group = data[i];
            var hosiptal = group.hospitalId;
            var trust = hosiptal.trust;
            var displayStr = generateDisplayName(group);
            
            if (hospitalId !== hosiptal.hospitalId){
                trustRows.push(<StyledTreeItem nodeId={String(specialIndex)} label={<FormControlLabel label={hospitalName} labelPlacement="start" control={<Checkbox size="small" checked={selected.indexOf(specialIndex) !== -1}/>}/>}>{hospitalRows}</StyledTreeItem>);
                //add the hospital tree as a branch in the trust tree
                hospitalId = hosiptal.hospitalId;
                hospitalName = hosiptal.hospitalName;
                //set the hospital pointer to current hospital
                specialIndex++;
                hospitalRows = [];
        
                if (trustId !== trust.trustId){
                    row.push(<StyledTreeItem nodeId={String(specialIndex)} label={<FormControlLabel label={trustName} labelPlacement="start" control={<Checkbox size="small" checked={selected.indexOf(specialIndex) !== -1}/>}/>}>{trustRows}</StyledTreeItem>);
                    //add the trust tree as a branch in the whole tree
                    trustName = trust.trustName;
                    trustId = trust.trustId;
                    specialIndex++;
                    trustRows = [];
                }
            }
    
            hospitalRows.push(<StyledTreeItem nodeId={String(i)} label={<FormControlLabel label={displayStr} labelPlacement="start" control={<Checkbox size="small" checked={selected.indexOf(i) !== -1} onChange={(e)=>{handleSelected(i)}}/>}/>}/>);
            selectedIndex ++;
        }
    
    
        trustRows.push(<StyledTreeItem nodeId={String(specialIndex)} label={<FormControlLabel label={hospitalName} labelPlacement="start" control={<Checkbox size="small" checked={selected.indexOf(specialIndex) !== -1}/>}/>}>{hospitalRows}</StyledTreeItem>);
        specialIndex++;
        row.push(<StyledTreeItem nodeId={String(specialIndex)} label={<FormControlLabel label={trustName} labelPlacement="start" control={<Checkbox size="small" checked={selected.indexOf(specialIndex) !== -1}/>}/>}>{trustRows}</StyledTreeItem>);
        specialIndex++;
        setRows(<StyledTreeItem nodeId={String(specialIndex)} label={<FormControlLabel label={"All Trusts"} labelPlacement="start" control={<Checkbox size="small" checked={selected.indexOf(specialIndex) !== -1} onChange={(e)=>{handleSelected(specialIndex)}} />}></FormControlLabel>}>{row}</StyledTreeItem>);
    },[data,selected])

    useEffect(()=>{
        GetData.getAllAdminsInOrder().then((ls)=>{
            setData(ls);
        });
    },[]);

    return ( 
        <>
        {rows}
        </>
     );
}

 
export default SharingListItems;