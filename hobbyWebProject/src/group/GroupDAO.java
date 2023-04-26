package group;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;



public class GroupDAO {
	private Connection conn;
	private ResultSet rs;
	
	
	public GroupDAO() {
		try {
		 	String dbURL = "jdbc:mysql://localhost:3306/hobbywebproject?useUnicode=true&characterEncoding=UTF-8";
		 	String dbID = "root";
		 	String dbPassword = "9228";
		 	Class.forName("com.mysql.jdbc.Driver");
		 	conn = DriverManager.getConnection(dbURL, dbID, dbPassword);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	//GroupID 번호매기기
	//SQL명령어 중 GROUP 이 있기 때문에 백틱 ``을 사용해 구분을 해줘야한다.
	public int getNext() {
		String SQL="SELECT groupID FROM `group` ORDER BY groupID DESC";//마지막 게시물 반환
	    try {
	    	PreparedStatement pstmt = conn.prepareStatement(SQL);
	        ResultSet rs = pstmt.executeQuery();
	        if(rs.next()) {
				return rs.getInt(1) + 1;
			}
			return 1; // 첫 번째 그룹인 경우
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
	    return -1;
	}
	//그룹 생성하기
	public int createGroup(String groupName, String groupPassword, String userID, int groupNoP) {
		String SQL ="INSERT INTO `group` VALUES(?, ?, ?, ?, ?, ?)";
		try {
			PreparedStatement pstmt=conn.prepareStatement(SQL);
			pstmt.setInt(1, getNext());
			pstmt.setString(2, groupName);
			pstmt.setString(3, groupPassword);
			pstmt.setString(4, userID);
			pstmt.setInt(5, 1);
			pstmt.setInt(6, groupNoP);
			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1;
	}
	
	//그룹 리스트 출력하기
	public ArrayList<GroupDTO> getList(int pageNumber){
		String SQL = "SELECT * FROM `group` WHERE groupID < ? ORDER BY groupID desc"; 
		ArrayList<GroupDTO> list = new ArrayList<GroupDTO>();
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, pageNumber*10);//물음표에 들어갈 내용
			rs = pstmt.executeQuery();
			while (rs.next()) {
				GroupDTO grp = new GroupDTO();
				grp.setGroupID(rs.getInt(1));
				grp.setGroupName(rs.getString(2));
				grp.setGroupPassword(rs.getString(3));
				grp.setUserID(rs.getString(4));
				grp.setGroupAvailable(rs.getInt(5));
				grp.setGroupNoP(rs.getInt(6));
				list.add(grp);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return list; 
	}
	//하나의 그룹 정보 가져오기
	public GroupDTO getGroupVO(int groupID) {
		String SQL = "SELECT * FROM `group` WHERE groupID = ?";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1,  groupID);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				GroupDTO grp = new GroupDTO();
				grp.setGroupID(rs.getInt(1));
				grp.setGroupName(rs.getString(2));
				grp.setGroupPassword(rs.getString(3));
				grp.setUserID(rs.getString(4));
				grp.setGroupAvailable(rs.getInt(5));
				grp.setGroupNoP(rs.getInt(6));
				return grp;
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	public boolean nextPage(int pageNumber) {//페이지 처리를 위한 함수
		String SQL="SELECT * from `group` where groupID < ?";
		try {
			PreparedStatement pstmt=conn.prepareStatement(SQL);
			pstmt.setInt(1, getNext()-(pageNumber-1)*10);
			rs=pstmt.executeQuery();
			if(rs.next()) {
				return true;//다음 페이지로 넘어갈 수 있음
			}			
		} catch(Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	//삭제하기
	public int delete(int groupID) {
		String SQL = "UPDATE `group` SET groupAvailable = 0 WHERE groupID = ? ";
		try {
			PreparedStatement pstmt = conn.prepareStatement(SQL);
			pstmt.setInt(1, groupID);
			//성공적으로 수행했다면 0이상의 결과 반환
			return pstmt.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -1; //데이터베이스 오류
	}
	/*
	public String getGroupPW(int groupID){
		String SQL = "SELECT groupPassword FROM `group` WHERE groupID = ?";
		try {
			PreparedStatement pstmt=conn.prepareStatement(SQL);
			pstmt.setInt(1, groupID);
			rs=pstmt.executeQuery();
			if (rs.next()) {
	            String password = rs.getString("groupPassword");
	            return password;
			}		
		} catch(Exception e) {
			e.printStackTrace();
		}
		return "";
	}*/
}
