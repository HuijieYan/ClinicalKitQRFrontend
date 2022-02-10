import { useEffect, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { Checkbox, FormControlLabel } from '@mui/material';
import GetData from "../Functions/GetData";
import CheckboxTree from "react-checkbox-tree";
import { node } from "prop-types";

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

const SharingListItems = ({data}) => {
    const [selected,setSelected] = useState([]);
    const [tree,setTree] = useState(null);
    
    const checkSelected = (i)=>{
        console.log("Check Selected "+i);
        return selected.indexOf(i) !== -1;
      }

    const handleSelected = (id,isChecked)=>{
      console.log(id);
      var ls = [...selected];
      var index = ls.indexOf(id);
      var selectOrDeselect = false;
      var node = findNode(id,tree);
      var children = getAllChild(node);
      //including the node self
      for (let i=0;i<children.length;i++){
        var childId = children[i];
        var idx = ls.indexOf(childId);
        if (!isChecked){
          if (idx===-1&&Number(childId)<data.length){
            ls.push(childId);
            //select no-child children
          }
        }else{
          if (idx!==-1){
            ls.splice(idx,1);
            //deselect selected no-child children
          }
        }
      }
      console.log(ls);
      setSelected(ls);
    };

    function getAllChild(node){
      var ls = [node.value];
      if (node.children !== undefined){
        for (let i=0;i<node.children.length;i++){
          
          var child = node.children[i];
          //console.log(child);
          ls= [...ls,...getAllChild(child)];
        }
      }

      return ls;
    }

    function findNode(id,node){
      if (node.value === id){
        return node;
      }
      if (node.children === undefined){
        return null;
      }
      var children = node.children;
      
      for (let i=0;i<children.length;i++){
        var child = children[i];
        var result = findNode(id,child);
        if(result !==null){
          return result;
        } 
      }
      return null;
    }


    const generateDisplayName = (group)=>{
        var displayStr = "";
        if(group.specialty===null){
          displayStr = group.name;
        }else{
          displayStr = group.name+"-"+group.specialty.specialty;
        }
        return displayStr;
      }

    function generateNodes(data){
      //console.log(data);
      var hospitalId = -1;
      var trustId = -1;
      var hospitalName = "";
      var trustName = "";
      var specialIndex = data.length;
      var tree = {label:"All Trust",value:String(specialIndex)};
      var trusts = [];
      var hospitals = [];
      var groups = [];
      specialIndex++;

      if (data.length>0){
        var group = data[0];
        var hospital = group.hospitalId;
        var trust = hospital.trust;

        trustId = trust.trustId;
        console.log(trustId);
        trustName = trust.trustName;
        hospitalId = hospital.hospitalId;
        hospitalName = hospital.hospitalName;
        //set the hospital and trust pointer to current hospital
     }

      for (let i = 0;i<data.length;i++){
        var group = data[i];
        var hospital = group.hospitalId;
        var trust = hospital.trust;
        var displayStr = generateDisplayName(group);

        if (hospitalId !== hospital.hospitalId){
          hospitals.push({label:hospitalName,value:String(specialIndex),children:groups});
          groups=[];
          hospitalName = hospital.hospitalName;
          hospitalId = hospital.hospitalId;
          specialIndex++;

          if (trustId !== trust.trustId){
            trusts.push({label:trustName,value:String(specialIndex),children:hospitals});
            hospitals = [];
            trustName = trust.trustName;
            trustId = trust.trustId;
            specialIndex++;
          }
        }

        groups.push({label:displayStr,value:String(i)});
      }
      

      hospitals.push({label:hospitalName,value:String(specialIndex),children:groups});
      specialIndex++;
      trusts.push({label:trustName,value:String(specialIndex),children:hospitals});
      specialIndex++;
      //console.log(trusts);
      tree["children"] = trusts;
      //console.log(tree);
      return tree;
    }

    function rendering(data){
      console.log("rendered");
      var tree = generateNodes(data);
      //console.log(tree);
      return renderItems(tree);
    }

    function renderItems(node){
      //console.log(node);
      const id = node.value;
      const label = node.label;
      const index = selected.indexOf(id);
      var childrenLs = getAllChild(node);
      childrenLs.splice(0,1);
      
      const children = childrenLs;
      //delete the node itself from the list
      const isChecked = (children.length==0&&index!==-1)||(children.length>0&&children.every((childId) => (Number(childId)>data.length || selected.indexOf(childId)!==-1)));
      /**
       * Node is checked in following conditions:
       * 1.if the node is an end node and it is selected
       * 2.if the node has children, its children are either selected end nodes or nodes that have children
       *   (decided by the value of the node)
       */
      const isIndeterminate =
      !isChecked && children.some((childId) => selected.indexOf(childId)!==-1);
      
      /** 
       * index = ls.indexOf(i);
      if ((isIndeterminate||!isChecked) && index!==-1){
        //if the node is not checked or is in interminate state while it is still recorded in selected list
        ls.splice(index,1);
      }else if (isChecked&&index===-1){
        //if the node is checked but not found in selected list
        ls.push(index);
      }
      */
      

      return (
      <StyledTreeItem key={id} nodeId={id} label={<FormControlLabel onClick={(e) => e.stopPropagation()} label={label} labelPlacement="start" control={<Checkbox onClick={(e) => e.stopPropagation()} size="small" checked={isChecked} indeterminate={isIndeterminate} onChange={(e)=>{handleSelected(node.value,isChecked)}}/>}/>}>
        {Array.isArray(node.children)?
          node.children.map((nodes)=>{
          return(renderItems(nodes));
        }):null}
      </StyledTreeItem>
      );
    }

    useEffect(()=>{
      setTree(generateNodes(data));
    },[data]);
    /*
    function renderItems(data){
      console.log(data);
      var row = [];
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
      }
  
  
      trustRows.push(<StyledTreeItem nodeId={String(specialIndex)} label={<FormControlLabel label={hospitalName} labelPlacement="start" control={<Checkbox size="small" checked={selected.indexOf(specialIndex) !== -1}/>}/>}>{hospitalRows}</StyledTreeItem>);
      specialIndex++;
      row.push(<StyledTreeItem nodeId={String(specialIndex)} label={<FormControlLabel label={trustName} labelPlacement="start" control={<Checkbox size="small" checked={selected.indexOf(specialIndex) !== -1}/>}/>}>{trustRows}</StyledTreeItem>);
      specialIndex++;
      return(<StyledTreeItem nodeId={String(specialIndex)} label={<FormControlLabel label={"All Trusts"} labelPlacement="start" control={<Checkbox size="small" checked={selected.indexOf(specialIndex) !== -1} onChange={(e)=>{handleSelected(specialIndex)}} />}></FormControlLabel>}>{row}</StyledTreeItem>);
    }
    */

    return ( 
      <>{rendering(data)}</>
     );
}

 
export default SharingListItems;