package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.dto.FeedDto;
import com.ssafy.jiguhero.data.entity.*;
import com.ssafy.jiguhero.data.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Component
public class FeedDaoImpl implements FeedDao{

    private final MissionRepository missionRepository;
    private final LikeMissionRepository likeMissionRepository;
    private final ConnMissionRepository connMissionRepository;
    private final FeedRepository feedRepository;
    private final LikeFeedRepository likeFeedRepository;

    private final ImageMissionRepository imageMissionRepository;

    @Autowired
    public FeedDaoImpl(MissionRepository missionRepository, LikeMissionRepository likeMissionRepository, ConnMissionRepository connMissionRepository, FeedRepository feedRepository, LikeFeedRepository likeFeedRepository, ImageMissionRepository imageMissionRepository) {
        this.missionRepository = missionRepository;
        this.likeMissionRepository = likeMissionRepository;
        this.connMissionRepository = connMissionRepository;
        this.feedRepository = feedRepository;
        this.likeFeedRepository = likeFeedRepository;
        this.imageMissionRepository = imageMissionRepository;
    }

    @Override
    public Feed selectFeedById(Long feedId){
        Feed selectedFeed = feedRepository.getById(feedId);

        return selectedFeed;
    }

    @Override
    public Feed selectFeedByImageMission(Image_Mission imageMission) {
        Feed selectedFeed = feedRepository.findByImageMission(imageMission);

        return selectedFeed;
    }

    @Override
    public Like_Feed selectLikeFeedByUser(Feed feed, User user){
        Optional<Like_Feed> selectedFeed = likeFeedRepository.findByFeedAndUser(feed, user);

        if (selectedFeed.isPresent()) return selectedFeed.get();
        else return null;
    }

    @Override
    public int countByFeed(Feed feed){
        int cnt = likeFeedRepository.countAllByFeed(feed);

        return cnt;
    }

    @Override
    public Feed insertFeed(Feed feed){
        Feed savedFeed = feedRepository.save(feed);
        return savedFeed;
    }

    @Override
    public void insertLikeFeed(Like_Feed likeFeed) {
        likeFeedRepository.save(likeFeed);
    }

    @Override
    public Optional<Feed> selectFeed(Long feedId, User user){
        Optional<Feed> result = null;
        result = feedRepository.findByFeedIdAndUserAndRegtime(feedId, user, LocalDate.now());
        if(result.isPresent()) return result;
        else return null;
    }

    @Override
    public Feed updateFeed(FeedDto feedDto) throws Exception{
        System.out.println(feedDto.toString());
        Optional<Feed> selectedFeed = feedRepository.findById(feedDto.getFeedId());
        Feed updatedFeed;
        Long imageId = feedDto.getImageId();
        Image_Mission imageMission = null;

        if (imageId != 0) {
            imageMission = imageMissionRepository.getById(feedDto.getImageId());
        }

        if(selectedFeed.isPresent()) {
            Feed feed = selectedFeed.get();
            feed.setContent(feedDto.getContent());
            if (imageMission != null) feed.setImageMission(imageMission);
            updatedFeed = feedRepository.save(feed);
        }
        else {
            throw new Exception();
        }

        return updatedFeed;
    }

    @Override
    public Optional<Feed> searchFeed(User user){
        Optional<Feed> result = null;
        result = feedRepository.findByUserAndRegtime(user, LocalDate.now());
        if(result.isPresent()) return result;
        else return null;
    }

    @Override
    public Optional<Feed> selectFeed(Mission mission, User user){
        Optional<Feed> result = null;
        result = feedRepository.findByMissionAndUserAndRegtime(mission, user, LocalDate.now());
        if(result.isPresent()) return result;
        else return null;
    }

    @Override
    public void deleteLikeFeed(Feed feed){
        likeFeedRepository.deleteAllByFeed(feed);
    }

    @Override
    @Transactional
    public void deleteLikeFeedByUser(Feed feed, User user) {
        likeFeedRepository.deleteByFeedAndUser(feed, user);
    }

    @Override
    public void deleteFeed(Long feedId){
        feedRepository.deleteById(feedId);
    }

    @Override
    public int countByFeed(Mission mission, User user){
        int cnt = feedRepository.countAllByMissionAndUser(mission, user);

        return cnt;
    }
}
