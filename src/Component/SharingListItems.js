import { useEffect, useState } from "react";
import { alpha, styled } from '@mui/material/styles';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { Checkbox, FormControlLabel } from '@mui/material';
import { storeSelection } from "../Storage/Actions/actions";
import { useDispatch, useSelector } from "react-redux";

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

/**
 * This is the items in the inbox sharing list
 * Node is checked in following conditions:
 * 1.if the node is an end node and it is selected
 * 2.if the node has children, its children are either selected end nodes or nodes that have children
 * (decided by the value of the node)
 * @class SharingListItems
 * @param {object} data list data
 * @param {object} generateNodes data nodes
 * @constructor
 */

const SharingListItems = ({data,generateNodes}) => {
    const [selected,setSelected] = useState([]);
    const [tree,setTree] = useState(null);
    const dispatch = useDispatch();
    const selection = useSelector((state) => state);
    

    const handleSelected = (id,isChecked)=>{
        const ls = [...selected];
        const node = findNode(id, tree);
        const children = getAllChild(node);
        //including the node self
        for (let i=0;i<children.length;i++){
          const childId = children[i];
          const idx = ls.indexOf(childId);
          if (!isChecked){
            if (idx!==-1||Number(childId)<0){
            }else{
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
      //console.log(ls);
      dispatch(storeSelection(ls));
      setSelected(ls);
    };

    function getAllChild(node){
        let ls = [node.value];
        if (node.children !== undefined){
        for (let i=0;i<node.children.length;i++){

            const child = node.children[i];
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

      const children = node.children;
      for (let i=0;i<children.length;i++){
          const child = children[i];
          const result = findNode(id, child);
          if(result !==null){
              return result;
          }
      }
      return null;
    }

    function rendering(){
      return renderItems(tree);
    }

    function renderItems(node){
      const id = node.value;
      const label = node.label;
      const index = selected.indexOf(id);
      const childrenLs = getAllChild(node);
      childrenLs.splice(0,1);
      
      const children = childrenLs;
      //delete the node itself from the list
      const isChecked = (children.length===0&&index!==-1)||(children.length>0&&children.every((childId) => (Number(childId)<0 || selected.indexOf(childId)!==-1)));
      const isIndeterminate =
      !isChecked && children.some((childId) => selected.indexOf(childId)!==-1);
      

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
      if (data.length>0){
        setTree(generateNodes(data));
      }
      setSelected(selection);
    },[data,generateNodes]);

    return (
      <>
        {data.length > 0 && tree !== null ? rendering() : null}
      </>
     );
}

 
export default SharingListItems;