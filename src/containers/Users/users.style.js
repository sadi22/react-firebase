import styled from 'styled-components';
import { palette } from 'styled-theme';
import Buttons from '../../components/uielements/button';
import Table from '../Tables/antTables/antTable.style';

const TableWrapper = styled(Table)`
  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    white-space: normal;
    &.noWrapCell {
      white-space: nowrap;
    }

    @media only screen and (max-width: 920px) {
      white-space: nowrap;
    }
  }
`;

const StatusTag = styled.span`
  padding: 0 5px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: ${palette('primary', 0)};
  font-size: 12px;
  color: #ffffff;
  text-transform: capitalize;

  &.draft {
    background-color: ${palette('warning', 0)};
  }

  &.publish {
    background-color: ${palette('success', 0)};
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const ButtonHolders = styled.div``;

const ComponentTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${palette('text', 0)};
  margin: 5px 0;
`;

const ActionBtn = styled(Buttons)`
  && {
    padding: 0 12px;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 17px;
      color: ${palette('text', 1)};
    }

    &:hover {
      i {
        color: inherit;
      }
    }
  }
`;

const Fieldset = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 13px;
  color: ${palette('text', 1)};
  line-height: 1.5;
  font-weight: 500;
  padding: 0;
  margin: 0 0 8px;
`;

const ActionWrapper = styled.div`
  display: flex;
  align-content: center;

  a {
    margin-right: 12px;
    &:last-child {
      margin-right: 0;
    }

    i {
      font-size: 18px;
      color: ${palette('primary', 0)};

      &:hover {
        color: ${palette('primary', 4)};
      }
    }

    &.deleteBtn {
      i {
        color: ${palette('error', 0)};

        &:hover {
          color: ${palette('error', 2)};
        }
      }
    }
  }
`;


const AvatarUpload = styled.span`
    label{
        width: 200px;
        margin: 0 auto;
        display: block;
    }
    .avatar-wrapper{
        position: relative;
        height: 200px;
        width: 200px;
        margin: 0 auto;
        border-radius: 50%;
        overflow: hidden;
        margin-bottom: 20px;
        box-shadow: 1px 1px 15px -5px black;
        transition: all .3s ease;
	// &:hover{
	// 	transform: scale(1.05);
	// 	cursor: pointer;
	// }
	// &:hover .profile-pic{
	// 	opacity: .5;
	// }
	.profile-pic {
        height: 100%;
		width: 100%;
		transition: all .3s ease;
		&:after{
			font-family: FontAwesome;
			content: "\\f007";
			top: 0; left: 0;
			width: 100%;
			height: 100%;
			position: absolute;
			font-size: 190px;
			background: #ecf0f1;
			color: #34495e;
			text-align: center;
		}
	}
	.upload-button {
		position: absolute;
		top: 0; left: 0;
		height: 100%;
		width: 100%;
		.fa-arrow-circle-up{
			position: absolute;
			font-size: 234px;
			top: -17px;
			left: 0;
			text-align: center;
			opacity: 0;
			transition: all .3s ease;
			color: #34495e;
		}
		&:hover .fa-arrow-circle-up{
			opacity: .9;
		}
	}
}
`;

const Form = styled.div``;

export {
    ActionBtn,
    Fieldset,
    Label,
    TitleWrapper,
    ButtonHolders,
    ActionWrapper,
    ComponentTitle,
    TableWrapper,
    StatusTag,
    AvatarUpload
};
