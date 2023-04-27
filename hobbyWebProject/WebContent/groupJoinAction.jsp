<%@page import="group.GroupDAO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.io.PrintWriter"%>
<%@page import="member.MemberDAO"%>
<%@page import="member.MemberDTO"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("UTF-8");
%>
<jsp:useBean id="member" class="member.MemberDTO" scope="page" />
<jsp:setProperty name="member" property="memberID" />
<jsp:setProperty name="member" property="mbContent" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>JSP 게시판 웹 사이트</title>
</head>
<body>
	<%
		String userID = null;
		if(session.getAttribute("userID") != null){
			userID = (String) session.getAttribute("userID");
		}
		if(userID == null){
			PrintWriter script = response.getWriter();
			script.println("<script>");
			script.println("alert('로그인이 필요합니다.')");
			script.println("location.href = 'login.jsp'");
			script.println("</script>");
		}else{
			int groupID = 0; 
		 	if (request.getParameter("groupID") != null){
		 		groupID = Integer.parseInt(request.getParameter("groupID"));
		 	}
		 	if (groupID == 0){
		 		PrintWriter script = response.getWriter();
		 		script.println("<script>");
		 		script.println("alert('유효하지 않은 그룹입니다.')");
		 		script.println("history.back()");
		 		script.println("</script>");
		 	}
			if(member.getMemberID() == null || member.getMbContent() == null) {
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('입력이 안된 사항이 있습니다.')");
				script.println("history.back()");
				script.println("</script>");
			}
			//groupID에 해당되는 member의 수가 groupNoP(정원)보다 같거나 크면 정원이 다 찼다는 알림을 띄운다.
			GroupDAO groupDAO = new GroupDAO();
			MemberDAO memberDAO = new MemberDAO();
			ArrayList<MemberDTO> mblist = memberDAO.getList(groupID);
			if(mblist.size() >= groupDAO.getGroupVO(groupID).getGroupNoP()){
				PrintWriter script = response.getWriter();
				script.println("<script>");
				script.println("alert('정원이 다 찼습니다.')");
				script.println("history.back()");
				script.println("</script>");	
			}else{
				//memberDAO에 userID와 groupID가 둘다 일치하는 데이터가 있으면 해당그룹에 이미 가입 되어있는것
				if(memberDAO.getMemberVO(userID, groupID) != null){
					PrintWriter script = response.getWriter();
					script.println("<script>");
					script.println("alert('이미 가입 되어있습니다.')");
					script.println("history.back()");
					script.println("</script>");	
				}else{
					int result = memberDAO.join(member.getMemberID(), groupID, userID, member.getMbContent());
					if(result == -1){ //데이터베이스 오류
						PrintWriter script = response.getWriter();
						script.println("<script>");
						script.println("alert('가입에 실패했습니다.')");
						script.println("history.back()");
						script.println("</script>");
					}
					else {
						//가입시 비밀번호 알려주기
						String pw = groupDAO.getGroupVO(groupID).getGroupPassword();
						PrintWriter script = response.getWriter();
						script.println("<script>");
						script.println("alert('가입이 완료되었습니다. 비밀번호는" + pw + "입니다')");
						script.println("location.href = 'groupPage.jsp'");
						script.println("</script>");
					}
				}
			}
		}
		
	%>
</body>
</html>